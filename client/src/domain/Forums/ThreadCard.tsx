import {
  Box,
  Link,
} from "@chakra-ui/react";
import { Props } from "framer-motion/types/types";
import { useHistory } from "react-router";

const Forums = (props: Props) => {

  let history = useHistory();
  return (
    <Box w="50vw" p={4} borderWidth="1px" borderRadius="lg" m={2}>
      <Box
        fontWeight="bold"
        textTransform="uppercase"
        fontSize="sm"
        letterSpacing="wide"
      >
        <Link onClick={() => history.push(`/topics/${props.topicid}`)}>
          {props.title}
        </Link>
      </Box>
      <Box
        color="gray.500"
        fontWeight="semibold"
        letterSpacing="wide"
        fontSize="xs"
        textTransform="uppercase"
      >
        {/* Note, user doesn't exist yet. We'll replace userid with user here when we have access to it.*/}
        By: {String(props.userid)}
      </Box>
    </Box>
  );
};

export default Forums;
