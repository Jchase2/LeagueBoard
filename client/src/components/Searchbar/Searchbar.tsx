import { InputGroup, InputLeftAddon, Input, Container } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import React,{ useEffect, useState } from "react";
import { fetchForumTopics } from "../../redux/slices/topicsSlice";
import { getForumTopic } from "../../api/api";
import { getUserInfo } from "../../../api/profileAPI";

import MapTopics from "./MapTopics";

interface Props {}

const Searchbar: React.FC<Props> = (props: Props) => {
  const [filteredTopics, setFilteredTopics] = useState<any>([])
  const dispatch = useAppDispatch();
  const topics = useAppSelector((state) => state.topicsReducer.topics);

  useEffect(() => {
    dispatch(fetchForumTopics());

  }, [dispatch]);

  console.log(topics);


  const onChange = (value:string) => {
    const result = topics.filter(topic => topic.title.toLowerCase().includes(value));
    console.log(result)
    setFilteredTopics(result);
  }

  return (
    <Container marginLeft="25px" padding="0px">
      <InputGroup size="md">
        <InputLeftAddon children={<SearchIcon color="gray.900" />} />
        <Input variant="filled" type="tel" placeholder="Search" onChange={event => (event.target.value)}/>
      </InputGroup>
    </Container>
  );
};


export default Searchbar
