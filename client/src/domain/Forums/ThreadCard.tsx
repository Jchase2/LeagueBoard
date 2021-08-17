import {
  Text,
  Box,
  Link,
} from "@chakra-ui/react";
import { Props } from "framer-motion/types/types";
import { useState } from "react";

const Forums = (props: Props) => {
  const [threadData, setThreadData] = useState({
    title: "A Default Title Title",
    user: "DefaultUser",
    topicid: 1,
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
        <Link href={`/forums/${threadData.topicid}`}>
          {threadData.title}
        </Link>
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

export default Forums;
