import { useState, useEffect } from "react";
import { Box, Flex, Text, Button, Spacer, Divider } from "@chakra-ui/react";
import { ITopicResp } from "../../interfaces";
import { getForumTopic } from "../../api";
import { useParams, useHistory } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { fetchUserInfo } from "../../redux/slices";
import {
  ReplyTopic,
  MapComments,
  ByComp,
  ReplyOrDelete,
  CloseThread,
  UpOrDownVote,
} from "./";

type urlParams = {
  id: string;
};

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

  useEffect(() => {
    if (Number(id) !== 0) {
      getForumTopic(+id).then((res) => {
        setThreadData(res);
        dispatch(fetchUserInfo());
      });
    }
  }, [id, dispatch]);

  return (
    <Flex minH="100vh" align="center" flexDirection="column" m={2}>
      <Box w="50vw" minW="300px" p={4} borderWidth="1px" borderRadius="lg">
        <Flex direction="row">
          <Box minW="20px" w="3vw" p={2} m={1}>
            {threadData.id && <UpOrDownVote thread={threadData} />}
          </Box>
          <Box minW="200px" w="40vw" p={2} m={1}>
            <Divider size="sm" />
            <Text mt={2}>{threadData.title}</Text>
          </Box>
        </Flex>
        <ByComp thread={threadData} />
        <Box border="1px" borderRadius="lg" mt={2} mb={2} p={3}>
          <Text>{threadData.text}</Text>
        </Box>
        {isReply && <ReplyTopic setIsReply={setIsReply} thread={threadData} />}
        <Flex direction="row">
          {threadData.id && (
            <ReplyOrDelete
              isReply={isReply}
              setIsReply={setIsReply}
              thread={threadData}
            />
          )}
          <Button onClick={() => history.push("/topics")} m={1}>
            Back
          </Button>
          <Spacer />
          <CloseThread setThreadData={setThreadData} threadData={threadData} />
        </Flex>
        <Box>{threadData.id && <MapComments />}</Box>
      </Box>
    </Flex>
  );
};

export default ThreadPage;
