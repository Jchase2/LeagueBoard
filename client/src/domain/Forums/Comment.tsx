import { useState, useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";
import { ITopicResp } from "../../interfaces/Topics";
import { getForumTopic } from "../../api/api";
import { Props } from "framer-motion/types/types";

const Comment = (props: Props) => {
  const [threadData, setThreadData] = useState<ITopicResp>({
    id: 0,
    userid: 1,
    parentid: 0,
    title: "",
    text: "",
    closed: false,
    created_at: "",
    updated_at: "",
  });

  useEffect(() => {
    getForumTopic(props.id).then((res) => {
      setThreadData(res);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box w="48vw" p={4} borderWidth="1px" borderRadius="lg" minW="300px" m={2}>
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
        By: {threadData.userid}
      </Box>
      <Box border="1px" borderRadius="lg" p={2} m={2} color="gray.500">
        <Text>{threadData.text}</Text>
      </Box>
    </Box>
  );
};

export default Comment;
