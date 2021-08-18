import { InputGroup, InputLeftAddon, Input, Container } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

interface Props {
 
}

const Searchbar: React.FC<Props> = () => {
  return (
    <Container marginLeft="25px" padding="0px">
      <InputGroup size="md">
        <InputLeftAddon children={<SearchIcon color="gray.900" />} />
        <Input variant="filled" type="tel" placeholder="Search" />
      </InputGroup>
    </Container>
  );
};


export default Searchbar
