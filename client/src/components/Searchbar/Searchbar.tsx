import { InputGroup, InputLeftAddon, Input, Container } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
/* import { useAppDispatch, useAppSelector } from "../../redux/hooks"; */
import React,{ /* useEffect, useState */ } from "react";
/* import { fetchForumTopics } from "../../redux/slices/topicsSlice";
import { getForumTopic } from "../../api/api";
import { getUserInfo } from "../../../api/profileAPI"; */

interface Props {
   message: string 
}

const Searchbar: React.FC<Props> = ({ message }) => {
  return (
    <Container marginLeft="25px" padding="0px">
      <InputGroup size="md">
        <InputLeftAddon children={<SearchIcon color="black" />} />
        <Input variant="filled" type="tel" placeholder={message} />
      </InputGroup>
    </Container>
  );
};


export default Searchbar
