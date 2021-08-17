import { useState, useEffect } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { ITopicResp } from "../../interfaces/Topics";
import { getForumTopic } from "../../api/api";
import { useParams } from "react-router-dom";
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

  return (
    <Flex
      minH="100vh"
      align="center"
      flexDirection="column"
      m={2}
    >
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
        <Box border="1px" borderRadius="1g" p={2} m={2} color="gray.500">
          <Text>{threadData.text}</Text>
        </Box>
      </Box>
    </Flex>
  );
};

export default ThreadPage;
