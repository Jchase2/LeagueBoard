import { Flex, Box, Heading, Button } from "@chakra-ui/react";
import { useEffect } from "react";
import { useHistory } from "react-router";
import ThreadCard from "./ThreadCard";
import SidebarWithHeader from "../../components/Heading/Heading";
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { fetchForumTopics } from "../../redux/slices/topicsSlice";

import { getForumTopics } from "../../api/api";
import { ITopicResp } from "../../interfaces";

const Topics: React.FC = () => {
  let history = useHistory();
  const dispatch = useAppDispatch()

  //const [threadArray, setThreadArray] = useState<ITopicResp[]>([]);
  const threadArray = useAppSelector(state => state.topicsReducer.topics)

  useEffect(() => {
    dispatch(fetchForumTopics());
  }, []);

  console.log("Thread Array: ", threadArray)
  return (
      <Flex minH="100vh" align="center" flexDirection="column">
        <Box textAlign="center">
          <Heading>Forums</Heading>
        </Box>
        <Box>
          <Button onClick={() => history.push("/topics/create")} m={1}>
            New Thread
          </Button>
          {threadArray.map((thread) => (
            <>
              {!(thread.parentid >= 1) && (
                <ThreadCard thread={thread} />
              )}
            </>
          ))}
        </Box>
      </Flex>
  );
};

export default Topics;