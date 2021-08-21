import { Box, Flex, Spacer } from "@chakra-ui/react";
import { Props } from "framer-motion/types/types";
import { Link } from "react-router-dom";
import { Text } from "@chakra-ui/layout";
import ByComp from "./ByComp";
import UpOrDownVote from "./UpOrDownVote";

const Forums: React.FC<Props> = ({ thread }) => {
  return (
    <Link to={`/topic/${thread.id}`}>
      <Flex
        p={4}
        borderWidth="1px"
        borderRadius="lg"
        m={2}
        w="50vw"
        flexDirection="column"
        justifyContent="center"
        alignContent="center"
      >
        <Text
          flexWrap="wrap"
          overflow="hidden"
          max-width="75ch"
          textOverflow="ellipsis"
        >
          <Flex direction="row">
            {thread.title}
            <Spacer />
            <UpOrDownVote thread={thread} />
          </Flex>
        </Text>
          <Box border="1px" borderRadius="lg" p={2} m={2} color="gray.500">
            <Text isTruncated>{thread.text}</Text>
          </Box>
        <Flex
          color="gray.500"
          fontWeight="semibold"
          letterSpacing="wide"
          fontSize="xs"
          textTransform="uppercase"
        >
          <ByComp thread={thread} />
        </Flex>
      </Flex>
    </Link>
  );
};

export default Forums;
