import {
  Box,
  Link,
} from "@chakra-ui/react";
import { Props } from "framer-motion/types/types";

const Forums = (props: Props) => {

  return (
    <Box w="50vw" p={4} borderWidth="1px" borderRadius="lg" m={2}>
      <Box
        fontWeight="bold"
        textTransform="uppercase"
        fontSize="sm"
        letterSpacing="wide"
      >
        <Link href={`/topics/${props.topicid}`}>
          {props.title}
        </Link>
      </Box>
      <Box
        color="gray.500"
        fontWeight="semibold"
        letterSpacing="wide"
        fontSize="xs"
        textTransform="uppercase"
        borderRadius="lg"
      >
        {/* Note, user doesn't exist yet. We'll replace userid with user here when we have access to it.*/}
        By: {String(props.userid)}
      </Box>
    </Box>
  );
};

export default Forums;
