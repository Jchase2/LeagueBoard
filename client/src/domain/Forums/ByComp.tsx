import { Flex } from "@chakra-ui/react";
import { Props } from "framer-motion/types/types";
import { useEffect, useState } from "react";
import { getTopicOwner } from '../../api/api';

const DateComp: React.FC<Props> = ({ thread }) => {

  const [threadCreator, setThreadCreator] = useState<String>("");

  useEffect(() => {
    if(thread.id){
      getTopicOwner(thread.id).then(owner => {
        setThreadCreator(owner?.summoner_name)
      })
    }
  }, [thread.id]);

  return (
    <Flex direction="row">
      {`By: ${threadCreator} at ` + new Date(thread.created_at).toLocaleTimeString() +
        " on " +
        new Date(thread.created_at).toLocaleDateString()}
    </Flex>
  );
};

export default DateComp;
