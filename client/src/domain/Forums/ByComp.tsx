import { Divider, Flex, Text } from "@chakra-ui/react";
import { Props } from "framer-motion/types/types";
import { useEffect, useState } from "react";
import { getTopicOwner } from "../../api";

const DateComp: React.FC<Props> = ({ thread }) => {
  const [threadCreator, setThreadCreator] = useState<String>("");

  useEffect(() => {
    if (thread.id) {
      getTopicOwner(thread.id).then((owner) => {
        setThreadCreator(owner?.summoner_name);
      });
    }
  }, [thread.id]);

  return (
    <Flex direction="column" borderRadius="lg" borderWidth="1px" p={2} mt={2}>
      <Text fontSize="xs">{`By: ${threadCreator} on ` + new Date(thread.created_at).toLocaleDateString() +
        " at " + new Date(thread.created_at).toLocaleTimeString()}</Text>
    </Flex>
  );
};

export default DateComp;
