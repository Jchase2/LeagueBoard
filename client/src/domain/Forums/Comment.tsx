import { useState, useEffect } from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { ITopicResp } from "../../interfaces/";
import { Props } from "framer-motion/types/types";
import ReplyTopic from "./ReplyTopic";
import { useAppSelector } from "../../redux/hooks";

const Comment: React.FC<Props> = (props) => {
  const user = useAppSelector((state) => state.userReducer.userState);

  const [threadData, setThreadData] = useState<ITopicResp>({
    id: 0,
    userid: 1,
    parentid: 0,
    title: "",
    text: "",
    closed: false,
    parenttitle: "",
    created_at: "",
    updated_at: "",
  });

  const [isReply, setIsReply] = useState(false);
  useEffect(() => {
    setThreadData(props.thread);
  }, [props.thread]);

  return (
    <Box w="48vw" p={4} borderWidth="1px" borderRadius="lg" minW="300px" m={2}>
      {threadData.parenttitle && (
        <Box>
          <Text>Reply To: {threadData.parenttitle}</Text>
        </Box>
      )}
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
        <Text>By: {user?.summoner_name}</Text>
        <Text>
          At{" "}
          {new Date(threadData.created_at).toLocaleTimeString() +
            " on " +
            new Date(threadData.created_at).toLocaleDateString()}
        </Text>
      </Box>
      <Box border="1px" borderRadius="lg" p={2} m={2} color="gray.500">
        <Text>{threadData.text}</Text>
      </Box>
      {isReply && (
        <ReplyTopic setIsReply={setIsReply} topicid={threadData.id} />
      )}
      {!isReply && (
        <Button onClick={() => setIsReply(true)} m={1}>
          Reply
        </Button>
      )}
    </Box>
  );
};

export default Comment;
