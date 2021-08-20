import { InputGroup, InputLeftAddon, Input, Container } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

interface Props {
   message: string 
}

const Searchbar: React.FC<Props> = ({ message }) => {
  return (
    <Container marginLeft="25px" padding="0px">
      <InputGroup size="md">
        <InputLeftAddon children={<SearchIcon color="gray.900" />} />
        <Input variant="filled" type="tel" placeholder={message} />
      </InputGroup>
    </Container>
  );
};


export default Searchbar
