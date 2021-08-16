import { Flex, Box, Center, Text, useColorModeValue, Heading } from "@chakra-ui/react";
import ThreadCard from './ThreadCard';

const Forums = () => {
  return (
    <Flex
      minH="100vh"
      align="center"
      flexDirection="column"
      bg={useColorModeValue("gray.100", "gray.900")}
    >
      <Box textAlign="center">
        <Heading>Forums</Heading>
      </Box>

    <Box>
      <ThreadCard />
    </Box>

    </Flex>
  )
};

export default Forums;
