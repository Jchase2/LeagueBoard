import { Flex, Box, Heading, Button, InputGroup, InputRightAddon, Input, useColorModeValue, Icon, useColorModePreference } from "@chakra-ui/react";
import { LinkIcon } from "@chakra-ui/icons";
import { IoMdCreate } from "react-icons/io"
import { useEffect } from "react";
import { useHistory } from "react-router";
import { useAppDispatch } from '../../redux/hooks';
import { fetchUserInfo } from "../../redux/slices";
import { fetchForumTopics } from "../../redux/slices/topicsSlice";

import { getForumTopics } from "../../api/api";
import { ITopicResp } from "../../interfaces";

import MapTopics from "./MapTopics";

const Topics: React.FC = () => {
  let history = useHistory();
  const dispatch = useAppDispatch()

  useEffect(() => {
    console.log("Delete")
    dispatch(fetchForumTopics());
    dispatch(fetchUserInfo())
  }, [dispatch]);

  return (
    <Flex minH="100vh" align="center" flexDirection="column">
      <Box textAlign="center">
        <Heading mb={4}>League Forums</Heading>
      </Box>
      <Flex flexDirection="column" padding="10px">
        <Flex flexDirection="column">
          <Button
            size="lg"
            boxShadow="lg"
            colorScheme={useColorModeValue("#F0F8FF", "black")}
            onClick={() => history.push("/topics/create")}
            mb={4}
            padding="30px"
            minW="40vw"
          >
            <Icon
              as={IoMdCreate}
              color={useColorModeValue("Black", "white")}
              marginRight="10px"
            ></Icon>
            <Input
              size="sm"
              backgroundColor={useColorModeValue("#F0F8FF", "gray.900")}
              borderRadius="10px"
              type="tel"
              placeholder="Create Thread"
            />
            <Icon
              as={LinkIcon}
              color={useColorModeValue("Black", "white")}
              marginLeft="10px"
            ></Icon>
          </Button>
        </Flex>
        <Flex flexDirection="column" justifyContent="center" alignItems="center">
          <MapTopics />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Topics;