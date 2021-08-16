import {
  Alert,
  AlertIcon,
  AlertTitle,
  CloseButton,
} from "@chakra-ui/react";

interface Props {
  message: string;
  isClosed: boolean;
  setIsError: Function;
}

export const ErrorShow = (props: Props) => {
  console.log(props);
  return (
    <>
      {props.isClosed && (
        <Alert
          status="error"
          mb="10px"
          align="center"
          justifyContent="center"
          flexDirection="column"
          maxW="35vw"
          borderRadius="10px"
        >
          <AlertIcon />
          <AlertTitle
            mr={2}
            display="flex"
            flexWrap="wrap"
            justifyContent="center"
          >
            {props.message}
          </AlertTitle>
          <CloseButton
            position="absolute"
            right="8px"
            top="8px"
            onClick={() => props.setIsError(!props.isClosed)}
          />
        </Alert>
      )}
    </>
  );
};
