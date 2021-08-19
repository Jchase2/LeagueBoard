import { Flex, Box, Heading, Button } from "@chakra-ui/react";
import { useEffect } from "react";
import { useHistory } from "react-router";
import { useAppDispatch } from '../../redux/hooks';
import { fetchUserInfo } from "../../redux/slices";
import { fetchForumTopics } from "../../redux/slices/topicsSlice";
import MapTopics from "./MapTopics";

const Topics: React.FC = () => {
  let history = useHistory();
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchForumTopics());
    dispatch(fetchUserInfo())
  }, [dispatch]);

  return (
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
  );
};

export default Topics;