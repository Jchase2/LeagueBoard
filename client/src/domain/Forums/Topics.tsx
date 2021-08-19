import { Flex, Box, Heading, Button } from "@chakra-ui/react";
import { useEffect } from "react";
import { useHistory } from "react-router";
import ThreadCard from "./ThreadCard";
import SidebarWithHeader from "../../components/Heading/Heading";
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { fetchForumTopics } from "../../redux/slices/topicsSlice";
import MapComments from "./MapComments";

const Topics: React.FC = () => {
  let history = useHistory();
  const dispatch = useAppDispatch()

  const threadArray = useAppSelector(state => state.topicsReducer.status === "resolved" ? state.topicsReducer.topics :  [])

  useEffect(() => {
    dispatch(fetchForumTopics());
  }, [dispatch]);

  console.log("Thread array: ", threadArray)

  return (
    <SidebarWithHeader>
      <Flex minH="100vh" align="center" flexDirection="column">
        <Box textAlign="center">
          <Heading>Forums</Heading>
        </Box>
        <Box>
          <Button onClick={() => history.push("/topics/create")} m={1}>
            New Thread
          </Button>
          <MapComments />
        </Box>
      </Flex>
    </SidebarWithHeader>
  );
};

export default Topics;