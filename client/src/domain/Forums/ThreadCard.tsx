import { Box, Flex } from "@chakra-ui/react";
import { Props } from "framer-motion/types/types";
import { Link } from "react-router-dom";
import { Text } from "@chakra-ui/layout";
import { useAppSelector } from "../../redux/hooks";

const Forums: React.FC<Props> = ({ thread }) => {
  const user = useAppSelector((state) => state.userReducer.userState);
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
          <b>{thread.title}</b> by: {user?.summoner_name}
        </Text>
        <Flex fontSize="sm" letterSpacing="wide">
          <Text
            flexWrap="wrap"
            overflow="hidden"
            max-width="75ch"
            textOverflow="ellipsis"
          >
            <b>{thread.text}</b>
          </Text>
        </Flex>
        <Flex
          color="gray.500"
          fontWeight="semibold"
          letterSpacing="wide"
          fontSize="xs"
          textTransform="uppercase"
        >
          <Text>
            At{" "}
            {new Date(thread.created_at).toLocaleTimeString() +
              " on " +
              new Date(thread.created_at).toLocaleDateString()}
          </Text>
        </Flex>
      </Flex>
    </Link>
  );
};

export default Forums;
