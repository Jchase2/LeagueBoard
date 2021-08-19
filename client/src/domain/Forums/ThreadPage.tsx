import { useState, useEffect } from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { ITopicResp } from "../../interfaces";
import { getForumComments, getForumTopic } from "../../api/api";
import { useParams, useHistory } from "react-router-dom";
import ReplyTopic from "./ReplyTopic";
import SidebarWithHeader from "../../components/Heading/Heading";
import Comment from "./Comment";

const ThreadPage: React.FC = () => {
  let history = useHistory();

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
  const [commentsArray, setCommentsArray] = useState<ITopicResp[]>([]);

  type urlParams = {
    id: string;
  };

  const updateComments = () => {
    getForumComments(+id).then((res) => {
      setCommentsArray(res);
    });
  };

  let { id } = useParams<urlParams>();
  useEffect(() => {
    getForumTopic(+id).then((res) => {
      setThreadData(res);
    });
    updateComments();
  }, [id]);

  return (
    <Flex minH="100vh" align="center" flexDirection="column" m={2}>
      <Box w="50vw" p={4} borderWidth="1px" borderRadius="lg" minW="300px">
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
        {isReply ? (
          <ReplyTopic
            setIsReply={setIsReply}
            topicid={id}
            updateComments={updateComments}
          />
        ) : null}
        {!isReply ? (
          <Button onClick={() => setIsReply(true)} m={1}>
            Reply
          </Button>
        ) : null}
        <Button onClick={() => history.push("/topics")} m={1}>
          Back
        </Button>
        <Box>
          {commentsArray.map((thread) => (
            <>
              {thread.parentid ? (
                <>
                  {console.log("Thread: ", thread)}
                  <Comment
                    id={thread.id}
                    thread={thread}
                    updateComments={updateComments}
                  />
                </>
              ) : null}
            </>
          ))}
        </Box>
      </Box>
    </Flex>
  );
};

export default ThreadPage;
