import { useState, useEffect } from "react";
import { Box, Flex, Text, Button, Link } from "@chakra-ui/react";
import { ITopicResp } from "../../interfaces/Topics";
import { getForumTopic } from "../../api/api";
import { useParams, useHistory } from "react-router-dom";
const ThreadPage = () => {
  const [threadData, setThreadData] = useState<ITopicResp>({
    id: 0,
    userid: 0,
    parentid: 0,
    title: "",
    text: "",
    closed: false,
    created_at: "",
    updated_at: "",
  });

  type urlParams = {
    id: string;
  };

  let { id } = useParams<urlParams>();
  useEffect(() => {
    console.log("Threadid: ", id);
    getForumTopic(Number(id)).then((res) => {
      setThreadData(res);
    });
  }, []);

  let history = useHistory();
  return (
    <Flex minH="100vh" align="center" flexDirection="column" m={2}>
      <Box w="50vw" p={4} borderWidth="1px" borderRadius="lg">
        <Box
          fontWeight="bold"
          textTransform="uppercase"
          fontSize="sm"
          letterSpacing="wide"
          color="fff"
        >
          {threadData.title}
        </Box>
        <Box
          color="gray.500"
          fontWeight="semibold"
          letterSpacing="wide"
          fontSize="xs"
          textTransform="uppercase"
        >
          {/* Need to replace this with username */}
          By: {threadData.id}
        </Box>
        <Box border="1px" borderRadius="lg" p={2} m={2} color="gray.500">
          <Text>{threadData.text}</Text>
        </Box>
        <Button onClick={() => history.push("/topics")} m={1}>
          Back
        </Button>
        <Button onClick={() => history.push("/topics/create")} m={1}>
          Reply
        </Button>
      </Box>
    </Flex>
  );
};

export default ThreadPage;
