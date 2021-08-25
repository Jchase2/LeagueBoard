import {
  IconButton,
  VStack,
  Text,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import { Props } from "framer-motion/types/types";
import { useEffect, useState } from "react";
import { getTopicOwner, getVotes, voteTopic, getVoteCount } from "../../api";
import { useAppSelector } from "../../redux/hooks";
import { FiStar } from "react-icons/fi";

const UpOrDownVote: React.FC<Props> = ({ thread }) => {
  const user = useAppSelector((state) => state.userReducer.userState);

  const [threadCreator, setThreadCreator] = useState<number>(0);
  const [hasVoted, setHasVoted] = useState<boolean>(false);
  const [votedValue, setVotedValue] = useState<number>(0);
  const [voteCount, setVoteCount] = useState<number>(0);

  useEffect(() => {
    if (thread.id && user) {
      getTopicOwner(thread.id).then((owner) => {
        setThreadCreator(owner?.id);
      });
      getVotes(thread.id, user.id).then((res) => {
        if (res?.value && user.id === res.userid) {
          setHasVoted(true);
          setVotedValue(res.value);
        }
      });
    }
    if (thread.id) {
      getVoteCount(thread.id).then((res) => {
        setVoteCount(res?.votes);
      });
    }
  }, [thread.id, threadCreator, user]);

  const handleClick = async (val) => {
    // !hasVoted ? setVoteCount(voteCount + val) : setVoteCount(voteCount + (val * 2))
    setHasVoted(true);
    setVotedValue(val);
    await voteTopic(thread.id, user.id, val);
    let vc = await getVoteCount(thread.id);
    setVoteCount(vc.votes);
  };

  return (
    <>
      {hasVoted === false && user ? (
        <VStack>
          <IconButton
            onClick={() => handleClick(1)}
            variant="outline"
            colorScheme="green"
            aria-label="Call Sage"
            icon={<BiUpvote />}
            size="xs"
          />
          <Text>{voteCount && voteCount}</Text>
          <IconButton
            onClick={() => handleClick(-1)}
            variant="outline"
            colorScheme="red"
            aria-label="Call Sage"
            icon={<BiDownvote />}
            size="xs"
          />{" "}
        </VStack>
      ) : hasVoted && votedValue === 1 && user ? (
        <VStack>
          <IconButton
            onClick={() => handleClick(1)}
            variant="solid"
            colorScheme="green"
            aria-label="Call Sage"
            icon={<BiUpvote />}
            size="xs"
          />
          <Text>{voteCount && voteCount}</Text>
          <IconButton
            onClick={() => handleClick(-1)}
            variant="outline"
            colorScheme="red"
            aria-label="Call Sage"
            icon={<BiDownvote />}
            size="xs"
          />
        </VStack>
      ) : user ? (
        <VStack>
          {" "}
          <IconButton
            onClick={() => handleClick(1)}
            variant="outline"
            colorScheme="green"
            aria-label="Call Sage"
            icon={<BiUpvote />}
            size="xs"
          />
          <Text>{voteCount && voteCount}</Text>
          <IconButton
            onClick={() => handleClick(-1)}
            variant="solid"
            colorScheme="red"
            aria-label="Call Sage"
            icon={<BiDownvote />}
            size="xs"
          />{" "}
        </VStack>
      ) : (
        <Flex direction="row" align="center" justify="center">
            <Text fontSize="sm">
              <Icon as={FiStar} />
              {" " + voteCount}
            </Text>
        </Flex>
      )}
    </>
  );
};

export default UpOrDownVote;