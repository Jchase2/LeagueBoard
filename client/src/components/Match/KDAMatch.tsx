import { Flex, Heading, useColorModeValue } from "@chakra-ui/react";

interface Props {
  kills: number;
  deaths: number;
  assists: number;
}

export const KDAMatch: React.FC<Props> = ({ kills, deaths, assists }) => {
  return (
    <Flex
      w="20%"
      maxW="20%"
      flexWrap="wrap"
      maxheight="100%"
      flexDirection="column"
    >
      <Flex
        w="100%"
        marginTop="25px"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        textAlign="center"
      >
        <Heading as="h6" size="xs" textAlign="center">
          {kills} /
        </Heading>
        <Heading as="h6" size="xs" margin="2px" color={useColorModeValue("red.700", "red.200")}>
          {deaths}
        </Heading>
        <Heading as="h6" size="xs">
          / {assists}
        </Heading>
      </Flex>
      <Flex justifyContent="center" alignItems="center">
        {`${((kills + assists) / deaths).toFixed(2)} KDA`}
      </Flex>
    </Flex>
  );
};
