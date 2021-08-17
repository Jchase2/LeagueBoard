import { Flex, Box, useColorModeValue, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ThreadCard from "./ThreadCard";
import { getForumTopics } from "../../api/backendApi";
import { ITopicResp } from "../../interfaces/Topics";

const Topics = () => {
  const [threadArray, setThreadArray] = useState<ITopicResp[]>([]);

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
      <Box>{threadArray.map((thread) => <ThreadCard key={thread.title} userid={thread.userid} topicid={thread.id} title={thread.title} text={thread.text}/>)}</Box>
    </Flex>
  );
};

export default Topics;