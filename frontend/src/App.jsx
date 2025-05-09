import {
    Box,
    Center, CloseButton, Dialog,
    Flex,
    Heading,
    IconButton,
    Input,
    InputGroup, Portal,
    Stack, Text,
    VStack
} from "@chakra-ui/react";
import {ChatMenu} from "@/ChatMenu.jsx";
import {ChatAvatar} from "@/ChatAvatar.jsx";
import { PiChatCircleDotsLight } from "react-icons/pi";
import {LuSearch} from "react-icons/lu";
import React, {useState} from "react";
import {useProductId, useProductStore} from "@/hooks/useProductStore.js";
import { useSearch } from "@/hooks/useSearch";
import { useLlm} from "@/hooks/useLlm";
import { LlmResultComponent } from "@/LlmResponse.jsx";


function App(

) {
    const input_str = useProductStore((state) => state.input_str);
    const { handleSearch } = useSearch();
    const { handleLlm } = useLlm();
    const updateProductId = useProductId((state) => state.fetchProductId);
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchResults = async (medicineId) => {
        setLoading(true);
        const data = await handleLlm(medicineId);
        setResults(data);
        setLoading(false);
    };


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
                              borderRadius={'3xl'}
                              onChange={(e) => handleSearch(e.target.value)}
                                  />
                  </InputGroup>
                  {/* Display search results in a grid of boxes */}
                  {input_str && input_str.length > 0 && (
                      <Stack
                          templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
                          gap={4}
                          width="45vw"
                          maxHeight="50vh"
                          p={4}
                      >
                          {input_str.map((item) => (
                              <Dialog.Root key={item._id} size="sm" scrollBehavior="outside" closeOnInteractOutside={false}>
                                  <Dialog.Trigger asChild>
                                      <Box

                                          p={4}
                                          borderRadius="md"
                                          boxShadow="md"
                                          bg="bg.muted"
                                          transition="transform 0.2s"
                                          _hover={{ transform: "translateY(-5px)" }}
                                          onClick={async () => {
                                              console.log(`Fetching document details for: ${item.key} with id ${item._id}`);
                                              setResults(null);
                                          }}
                                      >
                                          <Heading size="md" mb={2}>
                                              {item.key}
                                          </Heading>
                                      </Box>
                                  </Dialog.Trigger>
                                  <Portal>
                                      <Dialog.Backdrop />
                                      <Dialog.Positioner>
                                          <Dialog.Content>
                                              <Dialog.Header>
                                                  <Dialog.Title>{item.key}</Dialog.Title>
                                              </Dialog.Header>
                                              <Dialog.CloseTrigger asChild>
                                                  <CloseButton size="sm" onClick={() => {setResults(null);}}/>
                                              </Dialog.CloseTrigger>
                                              <Dialog.Body>
                                                  <Text whiteSpace="pre-line">
                                                      {item.value.replace(/\.(?!\d)([^:]*?):/g, '.\n\n$1:')}
                                                  </Text>

                                              </Dialog.Body>
                                              <Dialog.Body>
                                                  <Dialog.Title>Assistant Calculator</Dialog.Title>
                                              </Dialog.Body>
                                              <Dialog.Body>
                                                  <InputGroup
                                                              startElement={
                                                                  <PiChatCircleDotsLight  />}
                                                              endElement={<IconButton fontSize={'3xl'}
                                                                                      bg={'gray'}
                                                                                      size={'xs'}
                                                                                      onClick={async () =>
                                                                                          await fetchResults(item._id)
                                                                                      }
                                                                  >
                                                                  <LuSearch />
                                                              </IconButton>}>
                                                  <Input
                                                      placeholder={'Enter patient detail'}
                                                      variant={'subtle'}
                                                      size={'lg'}
                                                      borderRadius={'3xl'}
                                                      onChange={async (e) => updateProductId(e.target.value)}
                                                  />
                                                      </InputGroup>
                                              </Dialog.Body>
                                              <Dialog.Body>
                                                  <LlmResultComponent results={results} loading={loading} />
                                              </Dialog.Body>
                                          </Dialog.Content>
                                      </Dialog.Positioner>
                                  </Portal>
                              </Dialog.Root>
                          ))}
                      </Stack>
                  )}
              </VStack>
          </Center>

            <Box position="fixed"
             bottom="0"
             left="0"
             right="0"
             bg="bg.muted"
             py="2"
             textAlign="center"
             zIndex="1"
             borderTopColor="gray.200"
             >Shann RAG makes mistakes. Please consult professionals.</Box>

        </Stack>
    </Flex>
  )
}

export default App
