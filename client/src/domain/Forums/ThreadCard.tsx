import { Box, Divider, Flex } from "@chakra-ui/react";
import { Props } from "framer-motion/types/types";
import { Link } from "react-router-dom";
import { Text } from "@chakra-ui/layout";
import { ByComp, UpOrDownVote } from "./";

const Forums: React.FC<Props> = ({ thread }) => {
  return (
    <Flex color="white" borderRadius="lg" borderWidth="2px" m="2" p="2">
      <Box w="2vw" p={2} m={1}>
        {thread.id && <UpOrDownVote thread={thread} />}
      </Box>
      <Box minW="200px" w="40vw" p={2} m={1}>
        <Link to={`/topic/${thread.id}`}>
          <Box>
            <Text isTruncated>{thread.title}</Text>
          </Box>
          <Divider size="sm" />
          <Text isTruncated mt={2}>
            {thread.text}
          </Text>
          {thread.id && <ByComp thread={thread} />}
        </Link>
      </Box>
    </Flex>
  );
};

export default Forums;
