import { Flex, Box, Heading, Button, Center, InputGroup, InputLeftAddon, Input, Container } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";

import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { fetchForumTopics } from "../../redux/slices/topicsSlice";
import MapTopics from "./MapTopics";
import { ITopic } from "../../interfaces";
const Topics: React.FC = () => {
  const [filteredTopics, setFilteredTopics] = useState<ITopic[]>([]);
  const [query, setQuery] = useState<string>('');
  let history = useHistory();
  const dispatch = useAppDispatch()
  const topics:any[] = useAppSelector((state) => state.topicsReducer.topics);
  
  console.log(topics);


  useEffect(() => {
    console.log("Delete")
    dispatch(fetchForumTopics());
  }, []);

  const filteringTopics = (value:string) => {
    setQuery(value);
    const result = topics.filter(topic => topic.title.toLowerCase().includes(value));
    console.log(value)
    setFilteredTopics(result);
  }

  return (
      <Flex minH="100vh" align="center" flexDirection="column">
        <Center>
          <Container marginLeft="25px" padding="0px">
            <InputGroup size="md">
              <InputLeftAddon children={<SearchIcon color="gray.900" />} />
              <Input variant="filled" type="tel" placeholder="Search" onChange={event => filteringTopics(event.target.value)}/>
            </InputGroup>
          </Container>
        </Center>

        <Box textAlign="center">
          <Heading>Forums</Heading>
        </Box>
        <Box>
          <Button onClick={() => history.push("/topics/create")} m={1}>
            New Thread
          </Button>
          
          <MapTopics topics={query.length ? filteredTopics : topics}/>
          
        </Box>
      </Flex>
  );
};

export default Topics;