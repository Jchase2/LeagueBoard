import { InputGroup, InputLeftAddon, Input, Container } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

interface Props {
 
}

export default function Searchbar () {
  
  return (
    <Container marginLeft="25px">
      <InputGroup size="lg" >
        <InputLeftAddon children={<SearchIcon color="gray.500" />} />
        <Input
        variant="filled"
          type="tel"
          placeholder="Search"
        />
      </InputGroup>
    </Container>
  );
};
