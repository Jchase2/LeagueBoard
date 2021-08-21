import { IconButton, VStack } from "@chakra-ui/react";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import { Props } from "framer-motion/types/types";
import { useEffect, useState } from "react";
import { getTopicOwner, voteTopic } from "../../api/api";

const UpOrDownVote: React.FC<Props> = ({ thread }) => {
  const [threadCreator, setThreadCreator] = useState<number>(0);

  useEffect(() => {
    getTopicOwner(thread.id).then((owner) => {
      setThreadCreator(owner?.id);
    });
  }, [thread.id]);

  const handleClick = async (val) => {
    await voteTopic(thread.id, threadCreator, val)
  }

  return (
    <>
      <VStack>
        <IconButton
          onClick={() => handleClick(1)}
          variant="outline"
          colorScheme="green"
          aria-label="Call Sage"
          fontSize="20px"
          icon={<BiUpvote />}
        />
        <IconButton
          onClick={() => handleClick(-1)}
          variant="outline"
          colorScheme="red"
          aria-label="Call Sage"
          fontSize="20px"
          icon={<BiDownvote />}
        />
      </VStack>
    </>
  );
};

export default UpOrDownVote;
