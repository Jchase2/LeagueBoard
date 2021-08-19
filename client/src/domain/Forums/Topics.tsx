import { Flex, Box, Heading, Button } from "@chakra-ui/react";
import { useEffect } from "react";
import { useHistory } from "react-router";
import SidebarWithHeader from "../../components/Heading/Heading";
import { useAppDispatch } from '../../redux/hooks';
import { fetchForumTopics } from "../../redux/slices/topicsSlice";
import MapTopics from "./MapTopics";

const Topics: React.FC = () => {
  let history = useHistory();
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchForumTopics());
  }, [dispatch]);

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
          <MapTopics />
        </Box>
      </Flex>
    </SidebarWithHeader>
  );
};

export default Topics;