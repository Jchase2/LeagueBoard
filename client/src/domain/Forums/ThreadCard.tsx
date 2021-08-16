import {
  Text,
  Box,
  useColorModeValue,
  Heading,
  Container,
} from "@chakra-ui/react";
import { useState } from "react";

const Forums = () => {
  const [threadData, setThreadData] = useState({
    title: "A Default Title Title",
  });

  return (
    <Box w="70vw" p={4} borderWidth="1px" borderRadius="lg">
      <Text
        fontWeight="bold"
        textTransform="uppercase"
        fontSize="sm"
        letterSpacing="wide"
        color="teal.600"
      >
        {threadData.title}
      </Text>
    </Box>
  );
};

export default Forums;
