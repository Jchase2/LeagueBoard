import { Flex, Image } from "@chakra-ui/react";
import React from "react";

interface Props {
  item1: number;
  item2: number;
  item3: number;
  item4: number;
  item5: number;
  item6: number;
}

export const ItemMatch: React.FC<Props> = ({
  item1,
  item2,
  item3,
  item4,
  item5,
  item6,
}) => {
  return (
    <Flex
      w="20%"
      maxW="20%"
      flexDirection="column"
      h="100%"
      maxH="83px"
      margin="1px"
    >
      <Flex h="50%" flexDirection="row" padding="1px">
        <Image
          src={`https://opgg-static.akamaized.net/images/lol/item/${item1}.png?image=q_auto:best&v=1628647804`}
          borderRadius="20px"
        />
        <Image
          src={`https://opgg-static.akamaized.net/images/lol/item/${item2}.png?image=q_auto:best&v=1628647804`}
          borderRadius="20px"
        />
        <Image
          src={`https://opgg-static.akamaized.net/images/lol/item/${item3}.png?image=q_auto:best&v=1628647804`}
          borderRadius="20px"
        />
      </Flex>
      <Flex h="50%" flexDirection="row" padding="1px">
        <Image
          src={`https://opgg-static.akamaized.net/images/lol/item/${item4}.png?image=q_auto:best&v=1628647804`}
          borderRadius="20px"
        />
        <Image
          src={`https://opgg-static.akamaized.net/images/lol/item/${item5}.png?image=q_auto:best&v=1628647804`}
          borderRadius="20px"
        />
        <Image
          src={`https://opgg-static.akamaized.net/images/lol/item/${item6}.png?image=q_auto:best&v=1628647804`}
          borderRadius="20px"
        />
      </Flex>
    </Flex>
  );
};
