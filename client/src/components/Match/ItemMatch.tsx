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
      flexWrap="wrap"
      flexDirection="column"
      h="100%"
      alignItems="center"
      justifyContent="center"
    >
        {console.log(item1,item2, item3)}
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
