import { useState } from "react";
import { Text, Box, Link } from "@chakra-ui/react";
const Thread = () => {
  const [threadData, setThreadData] = useState({
    title: "A Default Title Title",
    user: "DefaultUser",
  });
  return (
    <Box w="50vw" p={4} borderWidth="1px" borderRadius="lg">
      <Box
        fontWeight="bold"
        textTransform="uppercase"
        fontSize="sm"
        letterSpacing="wide"
        color="teal.600"
      >
        {threadData.title}
      </Box>
      <Box
        color="gray.500"
        fontWeight="semibold"
        letterSpacing="wide"
        fontSize="xs"
        textTransform="uppercase"
      >
        By: {threadData.user}
      </Box>
    </Box>
  );
};

export default Thread;
