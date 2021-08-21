import { Flex } from "@chakra-ui/react";

interface Props {
  champLevel: number;
  totalMinionsKilled: number;
  gameDuration: number;
}

const CSMatch: React.FC<Props> = ({ champLevel, totalMinionsKilled, gameDuration}) => {
  return <Flex w="25%" maxW="20%" flexWrap="wrap"></Flex>;
};

export default CSMatch;
