import { IconButton, VStack, Text } from "@chakra-ui/react";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import { Props } from "framer-motion/types/types";
import { useEffect, useState } from "react";
import {
  getTopicOwner,
  getVotes,
  voteTopic,
  getVoteCount,
} from "../../api/api";

const UpOrDownVote: React.FC<Props> = ({ thread }) => {
  const [threadCreator, setThreadCreator] = useState<number>(0);
  const [hasVoted, setHasVoted] = useState<boolean>(false);
  const [votedValue, setVotedValue] = useState<number>(0);
  const [voteCount, setVoteCount] = useState<number>(0);

  useEffect(() => {
    if (thread.id) {
      getTopicOwner(thread.id).then((owner) => {
        setThreadCreator(owner?.id);
      });
      getVotes(thread.id, threadCreator).then((res) => {
        console.log("RES: ", res);
        if (res?.value) {
          setHasVoted(true);
          setVotedValue(res.value);
        }
      });
      getVoteCount(thread.id).then((res) => {
        setVoteCount(res?.votes);
      });
    }
  }, [thread.id, threadCreator]);

  const handleClick = async (val) => {
    setVoteCount(voteCount + val)
    setHasVoted(true);
    setVotedValue(val);
    await voteTopic(thread.id, threadCreator, val);
    getVoteCount(thread.id).then((res) => {
      setVoteCount(res?.votes);
    });
  };

  return (
    <VStack>
      {hasVoted === false ? (
        <>
          <IconButton
            onClick={() => handleClick(1)}
            variant="outline"
            colorScheme="green"
            aria-label="Call Sage"
            fontSize="20px"
            icon={<BiUpvote />}
          />
          <Text>{voteCount && voteCount}</Text>
          <IconButton
            onClick={() => handleClick(-1)}
            variant="outline"
            colorScheme="red"
            aria-label="Call Sage"
            fontSize="20px"
            icon={<BiDownvote />}
          />{" "}
        </>
      ) : hasVoted && votedValue === 1 ? (
        <>
          <IconButton
            onClick={() => handleClick(1)}
            variant="solid"
            colorScheme="green"
            aria-label="Call Sage"
            fontSize="20px"
            icon={<BiUpvote />}
          />
          <Text>{voteCount && voteCount}</Text>
          <IconButton
            onClick={() => handleClick(-1)}
            variant="outline"
            colorScheme="red"
            aria-label="Call Sage"
            fontSize="20px"
            icon={<BiDownvote />}
          />
        </>
      ) : (
        <>
          <IconButton
            onClick={() => handleClick(1)}
            variant="outline"
            colorScheme="green"
            aria-label="Call Sage"
            fontSize="20px"
            icon={<BiUpvote />}
          />
          <Text>{voteCount && voteCount}</Text>
          <IconButton
            onClick={() => handleClick(-1)}
            variant="solid"
            colorScheme="red"
            aria-label="Call Sage"
            fontSize="20px"
            icon={<BiDownvote />}
          />{" "}
        </>
      )}
    </VStack>
  );
};

export default UpOrDownVote;
