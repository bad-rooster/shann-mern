import {Box, Center, Flex, For, Heading, IconButton, Input, InputGroup, Stack, Text, VStack} from "@chakra-ui/react";
import {ChatMenu} from "@/ChatMenu.jsx";
import {ChatAvatar} from "@/ChatAvatar.jsx";
import { PiChatCircleDotsLight } from "react-icons/pi";
import {LuSearch} from "react-icons/lu";
import React from "react";
import {useCounterStore} from "@/store.js";

function App(

) {
    const [isFocused, setIsFocused] = React.useState(false);
    const input_str = useCounterStore((state) => state.input_str);
    const update = useCounterStore((state) => state.update);

  return (
    <Flex minH="100vdh">
        <Stack h='100vh'>
          <Flex bg='bg.muted' w='vw' justify='space-between' align='center' p='2'>
              <ChatMenu />
              <ChatAvatar />
          </Flex>
          <Center flex={'1'}>
              <VStack>
                  <Heading size={'3xl'} >What can I help with?</Heading>
                  <InputGroup minW={'45vw'}
                              startElement={
                                  <PiChatCircleDotsLight  />}
                              endElement={<IconButton fontSize={'3xl'}
                                                      bg={'gray'}
                                                      size={'xs'}
                                                      onClick={() => {
                                                          console.log('clicked');
                                                          console.log(input_str);}}>
                                  <LuSearch />
                              </IconButton>}>

                          <Input
                              placeholder={'Message Shann RAG'}
                              variant={'subtle'}
                              size={'lg'}
                              width={isFocused ? '80vw' : '45vw'}
                              height={isFocused ? '80vw' : '3.5vw'}
                              borderRadius={'3xl'}

                              onChange={

                              (ipt) => {
                                  if (ipt.target.value.length > 0) {
                                      console.log(ipt.target.value)
                                      fetch(`http://localhost:3000/api/search?key=${ipt.target.value}`)
                                          .then(response => response.json())
                                          .then(data => {
                                              data.data.forEach(entry => {
                                                  console.log(entry);

                                              })
                                              update(data.data)
                                              console.log("Updated data");
                                          })
                                          .catch(error => {
                                              console.error('Error fetching from /search:', error);
                                          });
                                  }
                              }}

                          />
                  </InputGroup>
              </VStack>
          </Center>
        <Box bg='bg.muted' pb='1vh' minW='100vw'>Shann RAG makes mistakes. Please consult professionals.</Box>

        </Stack>
    </Flex>
  )
}

export default App
