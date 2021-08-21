import React from "react";
import { Flex, Heading, Text, Tooltip } from "@chakra-ui/react";
import { Divider } from "@chakra-ui/react";
import { getFormattedTime, millisToMinutesAndSeconds } from "../../utils/romanToNum";

interface Props {
  queue: any;
  win: any;
  gameDuration: number;
  gameTime: any;
}

const TypeMatch: React.FC<Props> = ({ queue, gameDuration, win, gameTime }) => {
  gameTime = gameTime + "";
  return (
    <Flex
      w="25%"
      maxW="25%"
      flexWrap="wrap"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      padding="5px"
    >
      <Heading as="h6" size="xs" mb={1}>
        {queue[0].description.split("games")}
      </Heading>
      <Divider w="60%" />
      <Text mt={1} as="em">
        {win ? "Victory" : "Defeat"}
      </Text>
      <Tooltip hasArrow label={`${getFormattedTime(gameTime)}`}>
        <Text as="em">
           {millisToMinutesAndSeconds(gameDuration)}
        </Text>
      </Tooltip>
    </Flex>
  );
};

export default TypeMatch;
