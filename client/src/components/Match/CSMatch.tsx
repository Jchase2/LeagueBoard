import { Flex, Text, Tooltip, useColorModeValue } from "@chakra-ui/react";
import { millisToMinutesAndSeconds } from "../../utils/romanToNum"

interface Props {
  champLevel: number;
  totalMinionsKilled: number;
  gameDuration: number;
  kills: number;
  totalKill: number;
  assists: number
}

const CSMatch: React.FC<Props> = ({
  champLevel,
  totalMinionsKilled,
  gameDuration,
  totalKill,
  kills,
  assists,
}) => {
  const CSperMin = Number(
    millisToMinutesAndSeconds(gameDuration).substring(0, 2)
  ).toFixed(2);
  return (
    <Flex
      w="25%"
      maxW="20%"
      flexWrap="wrap"
      flexDirection="column"
      h="100%"
      justifyContent="center"
      alignItems="center"
    >
      <Text textAlign="center">Level {champLevel}</Text>
      <Tooltip hasArrow label="CS per minute">
        <Text textAlign="center">
          {totalMinionsKilled} (
          {(totalMinionsKilled / Number(CSperMin)).toFixed(2)}) CS
        </Text>
      </Tooltip>
      <Tooltip hasArrow label="Kill Participation">
        <Text
          textAlign="center"
          color={useColorModeValue("red.900", "red.200")}
        >
          P/Kill {(((kills + assists) / totalKill) * 100).toFixed()}%
        </Text>
      </Tooltip>
    </Flex>
  );
};

export default CSMatch;
