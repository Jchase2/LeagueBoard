import { Flex, Image, Tooltip, Text } from "@chakra-ui/react";
import { summonerSpells } from "../../utils/summonerSpells";
import { runes } from "../../utils/runes"
import { runesSub } from "../../utils/runeSub";
import parse from "html-react-parser";

interface Props {
  championName: string;
  SummonerSpell1: number;
  SummonerSpell2: number;
  rune1: number;
  rune2: number;
  opened: boolean;
  summonerName: string;
}

const ChampMatch: React.FC<Props> = ({
  championName,
  SummonerSpell1,
  SummonerSpell2,
  rune1,
  rune2,
  summonerName,
  opened,
}) => {
  const spell2 = summonerSpells[0][`${SummonerSpell2}`];
  const spell1 = summonerSpells[0][`${SummonerSpell1}`];
  const runeview = runes?.map((rune) => rune.slots);
  const idkwhatimdoing = runeview?.map((rune) => rune[0]);
  const newLoop = [
    idkwhatimdoing[0]?.runes[0],
    idkwhatimdoing[0]?.runes[1],
    idkwhatimdoing[0]?.runes[2],
    idkwhatimdoing[0]?.runes[3],
    idkwhatimdoing[1]?.runes[0],
    idkwhatimdoing[1]?.runes[1],
    idkwhatimdoing[1]?.runes[2],
    idkwhatimdoing[2]?.runes[0],
    idkwhatimdoing[2]?.runes[1],
    idkwhatimdoing[2]?.runes[2],
    idkwhatimdoing[2]?.runes[3],
    idkwhatimdoing[3]?.runes[0],
    idkwhatimdoing[3]?.runes[1],
    idkwhatimdoing[3]?.runes[2],
    idkwhatimdoing[4]?.runes[0],
    idkwhatimdoing[4]?.runes[1],
    idkwhatimdoing[4]?.runes[2],
  ];
  const wtfisthis1 = newLoop?.filter((loop) => loop?.id === rune1);
  const wtfisthis2 = runesSub[0][`${rune2}`];
  let Desc: any;
  if (wtfisthis1[0]) {
    Desc = wtfisthis1[0]["shortDesc"];
  }

  return (
    <>
      {championName && (
        <Flex
          flexWrap="wrap"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <Flex>
            <Tooltip hasArrow label={championName}>
              <Image
                src={`https://opgg-static.akamaized.net/images/lol/champion/${championName}.png?image=c_scale,q_auto,w_46&v=1628647804`}
                borderRadius="full"
                alt="Champion"
                w="46px"
                h="47px"
              />
            </Tooltip>
            <Flex flexDirection="column">
              <Tooltip hasArrow label={`${spell1.name}: ${spell1.description}`}>
                <Image
                  src={`https://opgg-static.akamaized.net/images/lol/spell/${spell1.id}.png?image=c_scale,q_auto,w_22&v=1628647804`}
                  borderRadius="full"
                  marginBottom="3px"
                  alt="Champion"
                  w="22px"
                  h="22px"
                />
              </Tooltip>
              <Tooltip hasArrow label={`${spell2?.name}: ${spell2?.description}`}>
                <Image
                  src={`https://opgg-static.akamaized.net/images/lol/spell/${spell2?.id}.png?image=c_scale,q_auto,w_22&v=1628647804`}
                  borderRadius="full"
                  alt="Champion"
                  w="22px"
                  h="22px"
                />
              </Tooltip>
            </Flex>
            <Flex flexDirection="column">
              <Tooltip hasArrow label={parse(`${Desc}`)}>
                <Image
                  src={`https://opgg-static.akamaized.net/images/lol/perk/${rune1}.png?image=c_scale,q_auto,w_18&v=1628647804`}
                  marginBottom="3px"
                  alt="Champion"
                  w="22px"
                  h="22px"
                />
              </Tooltip>
              <Tooltip hasArrow label={wtfisthis2}>
                <Image
                  src={`https://opgg-static.akamaized.net/images/lol/perkStyle/${rune2}.png?image=c_scale,q_auto,w_22&v=1628647804`}
                  alt="Champion"
                  w="22px"
                  h="22px"
                />
              </Tooltip>
            </Flex>
          </Flex>
          <Text as="cite">
            {!opened && championName} {opened && summonerName}
          </Text>
        </Flex>
      )}
    </>
  );
};

export default ChampMatch;
