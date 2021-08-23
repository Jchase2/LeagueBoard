import { Button, Input, useColorModeValue, Icon } from "@chakra-ui/react";
import { LinkIcon } from "@chakra-ui/icons";
import { IoMdCreate } from "react-icons/io";
import { useHistory } from "react-router";

const CreateTopicsButton: React.FC = () => {
  let history = useHistory();

  return (
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
  );
};

export default CreateTopicsButton;
