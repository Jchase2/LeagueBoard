import { useState, useEffect } from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { ITopicResp } from "../../interfaces";
import { getForumTopic } from "../../api/api";
import { useParams, useHistory } from "react-router-dom";
import ReplyTopic from "./ReplyTopic";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { deleteForumTopic, fetchUserInfo } from "../../redux/slices";
import MapComments from "./MapComments";
import ByComp from "./ByComp";

const ThreadPage: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<urlParams>();
  const dispatch = useAppDispatch();

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

  type urlParams = {
    id: string;
  };

  useEffect(() => {
    getForumTopic(+id).then((res) => {
      setThreadData(res);
      dispatch(fetchUserInfo());
    });
  }, [id, dispatch]);

  const handleDelete = () => {
    dispatch(deleteForumTopic(threadData.id));
    history.push("/topics");
  };

  return (
    <Flex minH="100vh" align="center" flexDirection="column" m={2}>
      <Box w="50vw"   minW="300px"p={4} borderWidth="1px" borderRadius="lg">
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
          <Flex direction="row">
            <ByComp thread={threadData} />
          </Flex>
        </Box>
        <Box border="1px" borderRadius="lg" p={2} m={2} color="gray.500">
          <Text>{threadData.text}</Text>
        </Box>
        {isReply && <ReplyTopic setIsReply={setIsReply} topicid={id} />}
        {!isReply && (
          <Button onClick={() => setIsReply(true)} m={1}>
            Reply
          </Button>
        )}
        <Button onClick={() => history.push("/topics")} m={1}>
          Back
        </Button>
        <Button m={1} onClick={handleDelete}>
          Delete
        </Button>
        <Box>
          <MapComments id={threadData.id} />
        </Box>
      </Box>
    </Flex>
  );
};

export default ThreadPage;
