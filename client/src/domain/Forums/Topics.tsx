import { Flex, Box, Heading, Button, InputGroup, InputRightAddon, Input, useColorModeValue, Icon, useColorModePreference, InputLeftAddon } from "@chakra-ui/react";
import { LinkIcon, SearchIcon } from "@chakra-ui/icons";
import { IoMdCreate } from "react-icons/io"
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchUserInfo } from "../../redux/slices";
import { fetchForumTopics } from "../../redux/slices/topicsSlice";
import MapTopics from "./MapTopics";
import { ITopic } from "../../interfaces";

const Topics: React.FC = () => {

  let history = useHistory();
  const dispatch = useAppDispatch()

  const [filteredTopics, setFilteredTopics] = useState<ITopic[]>([]);
  const [query, setQuery] = useState<string>('');
  const topics:any[] = useAppSelector((state) => state.topicsReducer.topics);

  useEffect(() => {
    dispatch(fetchForumTopics());
    dispatch(fetchUserInfo())
  }, [dispatch]);

  const filteringTopics = (value:string) => {
    setQuery(value);
    const result = topics.filter(topic => topic.title.toLowerCase().includes(value));
    console.log(value)
    setFilteredTopics(result);
  }

  return (
    <Flex minH="100vh" align="center" flexDirection="column">
      <Box textAlign="center">
        <Heading mb={4}>League Forums</Heading>
      </Box>
      <Flex flexDirection="column" padding="10px">
        <Flex flexDirection="column">
          <InputGroup size="sm" mb={4}>
            <InputLeftAddon borderRadius="10px" children={<SearchIcon color="gray.900" />} />
            <Input
              size="sm"
              backgroundColor={useColorModeValue("#F0F8FF", "gray.900")}
              borderRadius="10px"
              type="tel"
              placeholder="Search Thread"
              minW="40vw"
            />
          </InputGroup>
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
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <MapTopics topics={query.length ? filteredTopics : topics} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Topics;