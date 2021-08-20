import { Box } from "@chakra-ui/react";
import { Props } from "framer-motion/types/types";
import { Link } from "react-router-dom";
import { Text } from "@chakra-ui/layout";
import { useAppSelector } from "../../redux/hooks";

const Forums: React.FC<Props> = ({ thread }) => {
  const user = useAppSelector((state) => state.userReducer.userState);
  return (
    <Link to={`/topic/${thread.id}`}>
      <Box w="50vw" p={4} borderWidth="1px" borderRadius="lg" m={2}>
        <Box fontSize="sm" letterSpacing="wide">
          <Text>
            <b>{thread.title}</b> by: {user?.summoner_name}
          </Text>
        </Box>
        <Box
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
        </Box>
      </Box>
    </Link>
  );
};

export default Forums;
