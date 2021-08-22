import { Flex, Image } from "@chakra-ui/react";
import React from "react";

interface Props {}

export const ItemMatch: React.FC<Props> = () => {
  return (
    <Flex
      w="20%"
      maxW="20%"
      flexWrap="wrap"
      flexDirection="column"
      h="100%"
      alignItems="center"
      justifyContent="center"
    >
      <Flex>
        <Image />
        <Image />
        <Image />
      </Flex>
      <Flex>
        <Image />
        <Image />
        <Image />
      </Flex>
    </Flex>
  );
};
