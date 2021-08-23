import { Flex, Image, Tooltip, Text } from "@chakra-ui/react";
import { summonerSpells } from "../../utils/summonerSpells";
import { runes } from "../../utils/runes"

interface Props {
  championName: string;
  SummonerSpell1: number;
  SummonerSpell2: number;
  rune1: number;
  rune2: number;
}

const ChampMatch: React.FC<Props> = ({
  championName,
  SummonerSpell1,
  SummonerSpell2,
  rune1,
  rune2,
}) => {
  const spell2 = summonerSpells[0][`${SummonerSpell2}`];
  const spell1 = summonerSpells[0][`${SummonerSpell1}`];
  const rune1View = runes[0][`${rune1}`];
  const rune2View = runes[0][`${rune2}`];
  console.log(runes);
  console.log(rune1);

   const runeview = runes.map((rune) => rune.slots)
   console.log(runeview)
   const idkwhatimdoing = runeview.map((rune) => rune)
   console.log(idkwhatimdoing);

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
            <Image
              src={`https://opgg-static.akamaized.net/images/lol/champion/${championName}.png?image=c_scale,q_auto,w_46&v=1628647804`}
              borderRadius="full"
              alt="Champion"
            />
            <Flex flexDirection="column">
              <Tooltip hasArrow label={`${spell1.name}: ${spell1.description}`}>
                <Image
                  src={`https://opgg-static.akamaized.net/images/lol/spell/${spell1.id}.png?image=c_scale,q_auto,w_22&v=1628647804`}
                  borderRadius="full"
                  marginBottom="3px"
                  alt="Champion"
                />
              </Tooltip>
              <Tooltip hasArrow label={`${spell2.name}: ${spell2.description}`}>
                <Image
                  src={`https://opgg-static.akamaized.net/images/lol/spell/${spell2.id}.png?image=c_scale,q_auto,w_22&v=1628647804`}
                  borderRadius="full"
                  alt="Champion"
                />
              </Tooltip>
            </Flex>
            <Flex flexDirection="column">
              <Tooltip hasArrow label={``}>
                <Image
                  src={`https://opgg-static.akamaized.net/images/lol/perk/${rune1}.png?image=c_scale,q_auto,w_18&v=1628647804`}
                  marginBottom="3px"
                  alt="Champion"
                />
              </Tooltip>
              <Tooltip hasArrow label={``}>
                <Image
                  src={`https://opgg-static.akamaized.net/images/lol/perkStyle/${rune2}.png?image=c_scale,q_auto,w_22&v=1628647804`}
                />
              </Tooltip>
            </Flex>
          </Flex>
          <Text as="cite">{championName}</Text>
        </Flex>
      )}
    </>
  );
};

export default ChampMatch;
