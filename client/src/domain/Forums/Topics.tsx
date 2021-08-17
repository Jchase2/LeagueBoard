import {
  Flex,
  Box,
  useColorModeValue,
  Heading,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import ThreadCard from "./ThreadCard";
import { getForumTopics } from "../../api/api";
import { ITopicResp } from "../../interfaces/Topics";
import SidebarWithHeader from "../../components/Heading/Heading";

const Topics = () => {
  const [threadArray, setThreadArray] = useState<ITopicResp[]>([]);

  useEffect(() => {
    getForumTopics().then((res) => {
      setThreadArray(res);
    });
  }, []);

  let history = useHistory();
  return (
    <SidebarWithHeader>
      <Flex minH="100vh" align="center" flexDirection="column">
        <Box textAlign="center">
          <Heading>Forums</Heading>
        </Box>
        <Box>
          <Button onClick={() => history.push("/topics/create")} m={1}>
            New Thread
          </Button>
          {threadArray.map((thread) => (
            <ThreadCard
              key={thread.title}
              userid={thread.userid}
              topicid={thread.id}
              title={thread.title}
              text={thread.text}
            />
          ))}
        </Box>
      </Flex>
    </SidebarWithHeader>
  );
};

export default Topics;
