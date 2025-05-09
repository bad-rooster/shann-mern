import {Text, Box, Spinner, VStack} from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";


export const LlmResultComponent = ({loading, results}) => {
  return (
    <Box
      display="flex" width="100%" justifyContent="center"

    >
      {loading ? (
        <VStack colorPalette="teal" justifyContent="center" alignItems="center"
        >
          <Spinner color="colorPalette.600" animationDuration="0.8s" size="lg" borderWidth="3px"/>
          <Text color="colorPalette.600">Loading...</Text>
        </VStack>
      ) : results ? (
        <Box mt={-2} width="100%">
          <Box textAlign="left">
            <ReactMarkdown>
              {results.replace(/\.(?!\d)/g, '\.\n')}
            </ReactMarkdown>
          </Box>

        </Box>
      ) : null}
    </Box>
  );
};