import { Text, Box } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";


export const LlmResultComponent = ({ loading, results }) => {
    console.log("Rendering LlmResultComponent");
    console.log("loading", loading);
    console.log(results);
    return (
        <Box>
            {loading ? (
                <Text>Loading results...</Text>
            ) : results ? (
                <Box mt={4}>
                    <Box mt={2}>
                        <ReactMarkdown>
                            {results}
                        </ReactMarkdown>
                    </Box>

                </Box>
            ) : null}
        </Box>
    );
};