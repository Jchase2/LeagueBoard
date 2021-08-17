import { Flex, Box, useColorModeValue, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ThreadCard from "./ThreadCard";
import { getForumTopics } from "../../api/api";
import { IThread } from "../../interfaces/Forums";

const Forums = () => {
  const [threadArray, setThreadArray] = useState<IThread[]>([]);

  useEffect(() => {
    getForumTopics().then((res) => {
      setThreadArray(res);
    });
  }, []);

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

      <Box>{threadArray.map((thread) => <ThreadCard title={thread.title} id={thread.id} text={thread.text}/>)}</Box>
    </Flex>
  );
};

export default Forums;
