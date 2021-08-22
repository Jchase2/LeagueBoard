import { Flex, Image } from "@chakra-ui/react";
import React from "react";

interface Props {
  item0: number
  item1: number;
  item2: number;
  item3: number;
  item4: number;
  item5: number;
}

export const ItemMatch: React.FC<Props> = ({
  item0,
  item1,
  item2,
  item3,
  item4,
  item5,
}) => {
  return (
    <Flex
      flexDirection="column"
      h="100%"
      maxH="83px"
      maxW="150px"
      margin="1px"
      padding="1px"
    >
      <Flex
        h="50%"
        flexDirection="row"
        padding="1px"
        justifyContent="space-evenly"
      >
        <Image
          src={
            item0 !== 0
              ? `https://opgg-static.akamaized.net/images/lol/item/${item0}.png?image=q_auto:best&v=1628647804`
              : ""
          }
          borderRadius="10px"
        />
        <Image
          src={
            item1 !== 0
              ? `https://opgg-static.akamaized.net/images/lol/item/${item1}.png?image=q_auto:best&v=1628647804`
              : ""
          }
          borderRadius="10px"
        />
        <Image
          src={
            item2 !== 0
              ? `https://opgg-static.akamaized.net/images/lol/item/${item2}.png?image=q_auto:best&v=1628647804`
              : ""
          }
          borderRadius="10px"
        />
      </Flex>
      <Flex h="50%" flexDirection="row" padding="1px" justifyContent="center">
        <Image
          src={
            item3 !== 0
              ? `https://opgg-static.akamaized.net/images/lol/item/${item3}.png?image=q_auto:best&v=1628647804`
              : ""
          }
          borderRadius="10px"
        />
        <Image
          src={
            item4 !== 0
              ? `https://opgg-static.akamaized.net/images/lol/item/${item4}.png?image=q_auto:best&v=1628647804`
              : ""
          }
          borderRadius="10px"
        />
        <Image
          src={
            item5 !== 0
              ? `https://opgg-static.akamaized.net/images/lol/item/${item5}.png?image=q_auto:best&v=1628647804`
              : ""
          }
          borderRadius="10px"
        />
        
      </Flex>
    </Flex>
  );
};
