import { useState, useEffect } from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { ITopicResp } from "../../interfaces/";
import { Props } from "framer-motion/types/types";
import ReplyTopic from "./ReplyTopic";

const Comment: React.FC<Props> = (props) => {
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
    props.updateComments()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box w="48vw" p={4} borderWidth="1px" borderRadius="lg" minW="300px" m={2}>
      {threadData.parenttitle && <Box><Text>Reply To: {threadData.parenttitle}</Text></Box>}
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
        {/* TODO: Need to replace this with username */}
        By: {threadData.userid}
      </Box>
      <Box border="1px" borderRadius="lg" p={2} m={2} color="gray.500">
        <Text>{threadData.text}</Text>
      </Box>
      {isReply && (
        <ReplyTopic
          setIsReply={setIsReply}
          topicid={threadData.id}
          updateComments={props.updateComments}
        />
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
