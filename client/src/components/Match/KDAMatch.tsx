import { Flex, Heading, Text } from "@chakra-ui/react";

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
      <Flex w="100%" marginTop="25px"justifyContent="center" alignItems="center">
        <Heading as="h6" size="xs" marginLeft="2px">
          {kills} /
        </Heading>
        <Heading as="h6" size="xs" marginLeft="2px" color="red">
          {deaths}
        </Heading>
        <Heading as="h6" size="xs" marginLeft="2px">
          / {assists}
        </Heading>
      </Flex>
      <Flex justifyContent="center" alignItems="center">
        {`${((kills + assists) / deaths).toFixed(2)} KDA`}
      </Flex>
    </Flex>
  );
};
