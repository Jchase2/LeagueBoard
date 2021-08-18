import { useState, useEffect } from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { ITopicResp } from "../../interfaces/Topics";
import { getForumComments, getForumTopic } from "../../api/api";
import { Props } from "framer-motion/types/types";
import ReplyTopic from "./ReplyTopic";

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

  const [isReply, setIsReply] = useState(false);
  const [commentsArray, setCommentsArray] = useState<ITopicResp[]>([]);

  useEffect(() => {
    getForumTopic(props.id).then((res) => {
      setThreadData(res);
    });
    updateComments()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateComments = () => {
    getForumComments(threadData.id).then((res) => {
      setCommentsArray(res);
    });
  };

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
      {isReply ? (
        <ReplyTopic
          setIsReply={setIsReply}
          topicid={threadData.id}
          updateComments={updateComments}
        />
      ) : null}
      {!isReply ? (
        <Button onClick={() => setIsReply(true)} m={1}>
          Reply
        </Button>
      ) : null}
      {console.log("I'm confused: ", commentsArray)}
      {commentsArray.map((thread) => (
        <>
          {thread.parentid === threadData.id ? (
            <Comment id={thread.id} />
          ) : null}
        </>
      ))}
    </Box>
  );
};

export default Comment;
