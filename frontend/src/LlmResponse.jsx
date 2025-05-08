import { useLlm } from "@/hooks/useLlm";
import { Text, Box, Button } from "@chakra-ui/react";
import { useState } from "react";

export const LlmResultComponent = ({ loading, results }) => {
    // const { handleLlm } = useLlm();
    // const [results, setResults] = useState(null);
    // const [loading, setLoading] = useState(false);

    return (
        <Box>
            {loading ? (
                <Text>Loading results...</Text>
            ) : results ? (
                <Box mt={4}>
                    <Text mt={2} whiteSpace="pre-wrap">
                        {results}
                    </Text>
                </Box>
            ) : null}
        </Box>
    );
};