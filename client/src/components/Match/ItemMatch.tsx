import { Flex, Image, Tooltip } from "@chakra-ui/react";
import { items } from "../../utils/items"
import parse from 'html-react-parser'

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
    const item0View = items[0]?.data[0][`${item0}`]
    const item1View = items[0]?.data[0][`${item1}`]
    const item2View = items[0]?.data[0][`${item2}`]
    const item3View = items[0]?.data[0][`${item3}`]
    const item4View = items[0]?.data[0][`${item4}`]
    const item5View = items[0]?.data[0][`${item5}`]
  return (
    <>
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
          {item0View && (
            <Tooltip
              hasArrow
              label={
                <>
                  {" "}
                  {item0View?.name} : {parse(`${item0View?.description}`)}{" "}
                </>
              }
            >
              <Image
                src={
                  item0 !== 0
                    ? `https://opgg-static.akamaized.net/images/lol/item/${item0}.png?image=q_auto:best&v=1628647804`
                    : ""
                }
                borderRadius="10px"
                h="38.500px"
                w="38.500px"
              />
            </Tooltip>
          )}
          {item1View && (
            <Tooltip
              hasArrow
              label={
                <>
                  {" "}
                  {item1View?.name} : {parse(`${item1View?.description}`)}{" "}
                </>
              }
            >
              <Image
                src={
                  item1 !== 0
                    ? `https://opgg-static.akamaized.net/images/lol/item/${item1}.png?image=q_auto:best&v=1628647804`
                    : ""
                }
                borderRadius="10px"
                h="38.500px"
                w="38.500px"
              />
            </Tooltip>
          )}
          {item2View && (
            <Tooltip
              hasArrow
              label={
                <>
                  {" "}
                  {item2View?.name} : {parse(`${item2View?.description}`)}{" "}
                </>
              }
            >
              <Image
                src={
                  item2 !== 0
                    ? `https://opgg-static.akamaized.net/images/lol/item/${item2}.png?image=q_auto:best&v=1628647804`
                    : ""
                }
                borderRadius="10px"
                h="38.500px"
                w="38.500px"
              />
            </Tooltip>
          )}
        </Flex>
        <Flex
          h="50%"
          flexDirection="row"
          padding="1px"
          justifyContent="space-evenly"
        >
          {item3View && (
            <Tooltip
              hasArrow
              label={
                <>
                  {" "}
                  {item3View?.name} : {parse(`${item3View?.description}`)}{" "}
                </>
              }
            >
              <Image
                src={
                  item3 !== 0
                    ? `https://opgg-static.akamaized.net/images/lol/item/${item3}.png?image=q_auto:best&v=1628647804`
                    : ""
                }
                borderRadius="10px"
                h="38.500px"
                w="38.500px"
              />
            </Tooltip>
          )}
          {item4View && (
            <Tooltip
              hasArrow
              label={
                <>
                  {" "}
                  {item4View?.name} : {parse(`${item4View?.description}`)}{" "}
                </>
              }
            >
              <Image
                src={
                  item4 !== 0
                    ? `https://opgg-static.akamaized.net/images/lol/item/${item4}.png?image=q_auto:best&v=1628647804`
                    : ""
                }
                borderRadius="10px"
                h="38.500px"
                w="38.500px"
              />
            </Tooltip>
          )}
          {item5View && (
            <Tooltip
              hasArrow
              label={
                <>
                  {" "}
                  {item5View?.name} {parse(`${item5View?.description}`)}{" "}
                </>
              }
            >
              <Image
                src={
                  item5 !== 0
                    ? `https://opgg-static.akamaized.net/images/lol/item/${item5}.png?image=q_auto:best&v=1628647804`
                    : "NOTHING"
                }
                borderRadius="10px"
                h="38.500px"
                w="38.500px"
              />
            </Tooltip>
          )}
        </Flex>
      </Flex>
    </>
  );
};
