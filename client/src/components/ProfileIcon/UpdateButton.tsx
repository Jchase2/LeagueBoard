import { Button, useColorModeValue } from "@chakra-ui/react";

interface Props {
    handleupdate: Function
    loading: boolean
}

const UpdateButton: React.FC<Props> = ({ handleupdate, loading  }) => {
    const color = useColorModeValue(
      "#63a4ff; background-image: linear-gradient(315deg, #63a4ff 0%, #83eaf1 74%);",
      "#7f5a83; background-image: linear-gradient(315deg, #7f5a83 0%, #0d324d 74%);)"
    );

    return loading ? (
      <Button
        bgGradient={color}
        flex={1}
        fontSize={"sm"}
        rounded={"full"}
        _hover={{
          bg: "blue.500",
        }}
        isLoading
        onClick={() => handleupdate()}
      >
        Update
      </Button>
    ) : (
      <Button
        bgGradient={color}
        flex={1}
        fontSize={"sm"}
        rounded={"full"}
        _hover={{
          bg: "blue.500",
        }}
        onClick={() => handleupdate()}
      >
        Update
      </Button>
    );
}

export default UpdateButton