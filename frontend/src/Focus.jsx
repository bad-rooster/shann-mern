import React from 'react';
import {Box, Input, Text, Field} from '@chakra-ui/react';
import { toaster } from "@components/ui/toaster.jsx"
function FocusExample() {
    const [isFocused, setIsFocused] = React.useState(false);

    const handleFocus = () => {
        setIsFocused(true);
        toaster.create({
            title: "Input focused",
            description: "You've focused on the input field",
            status: "info",
            duration: 2000,
            isClosable: true,
        });
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    return (
        <Box p={5} border="1px" borderColor="gray.200" borderRadius="md">
            <Field>
                <Field.label>Focus example</Field.label>
                <Input
                    placeholder="Click or tab into this input"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    borderColor={isFocused ? "blue.500" : "gray.300"}
                    _hover={{ borderColor: "blue.300" }}
                />
                <Text mt={2} color={isFocused ? "blue.500" : "gray.500"}>
                    {isFocused ? "Input is focused!" : "Input is not focused"}
                </Text>
            </Field>
        </Box>
    );
}

export default FocusExample;