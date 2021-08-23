import {
  Flex,
  Box,
  Heading,
  InputGroup,
  Input,
  useColorModeValue,
  InputLeftAddon,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchUserInfo, fetchForumTopics } from "../../redux/slices";
import { MapTopics, CreateTopicButton } from "./";
import { ITopic } from "../../interfaces";

const Topics: React.FC = () => {

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userReducer.userState);
  const topics = useAppSelector((state) => state.topicsReducer.topics);

  const [filteredTopics, setFilteredTopics] = useState<ITopic[]>([]);
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    dispatch(fetchForumTopics());
    dispatch(fetchUserInfo());
  }, [dispatch]);

  const filteringTopics = (value: string) => {
    setQuery(value);
    const result = topics.filter((topic) =>
      topic.title.toLowerCase().includes(value)
    );
    setFilteredTopics(result);
  };

  return (
    <Flex minH="100vh" align="center" flexDirection="column">
      <Box textAlign="center">
        <Heading mb={4}>League Forums</Heading>
      </Box>
      <Flex flexDirection="column" padding="10px">
        <Flex flexDirection="column">
          <InputGroup size="sm" mb={4}>
            <InputLeftAddon
              borderRadius="10px"
              children={<SearchIcon color="gray.900" />}
            />
            <Input
              size="sm"
              backgroundColor={useColorModeValue("#F0F8FF", "gray.900")}
              onChange={(event) => filteringTopics(event.target.value)}
              borderRadius="10px"
              type="tel"
              placeholder="Search Thread"
              minW="40vw"
            />
          </InputGroup>
          {user && <CreateTopicButton />}
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
