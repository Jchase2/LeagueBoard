import { useState, useEffect } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { ITopicResp } from "../../interfaces/";
import { Props } from "framer-motion/types/types";
import { ReplyTopic, ByComp, ReplyOrDelete} from "./";

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
  }, [props.thread]);

  return (
    <Box w="48vw" p={4} borderWidth="1px" borderRadius="lg" m={2}>
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
        <Text>Reply To: {threadData.parenttitle}</Text>
      </Box>
      <Box
        color="gray.500"
        fontWeight="semibold"
        letterSpacing="wide"
        fontSize="xs"
        textTransform="uppercase"
      >
        <Flex direction="row">
          <ByComp thread={threadData} />
        </Flex>
      </Box>
      <Box border="1px" borderRadius="lg" p={2} m={2} color="gray.500">
        <Text>{threadData.text}</Text>
      </Box>
      {isReply && threadData.id && (
        <ReplyTopic setIsReply={setIsReply} thread={threadData} />
      )}
      {threadData.id && <ReplyOrDelete isReply={isReply} setIsReply={setIsReply} thread={threadData}/>}
    </Box>
  );
};

export default Comment;
