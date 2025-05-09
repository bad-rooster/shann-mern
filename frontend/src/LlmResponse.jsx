import {Text, Box, Spinner, VStack} from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";


export const LlmResultComponent = ({loading, results}) => {
  return (
    <Box
      display="flex" justifyContent="center" width="100%"
    >
      {loading ? (
        <VStack colorPalette="teal">
          <Spinner color="colorPalette.600" animationDuration="0.8s" size="lg" borderWidth="3px"/>
          <Text color="colorPalette.600">Loading...</Text>
        </VStack>
      ) : results ? (
        <Box mt={-2}>
          <Box>
            <ReactMarkdown>
              {results.replace(/\.(?!\d)/g, '\.\n')}
            </ReactMarkdown>
          </Box>

        </Box>
      ) : null}
    </Box>
  );
};