import { Flex, Image, Tooltip, Text} from "@chakra-ui/react";
import { summonerSpells } from "../../utils/summonerSpells";

interface Props {
  championName: string;
  SummonerSpell1: number
  SummonerSpell2: number
  rune1: number
  rune2: number
}

const ChampMatch: React.FC<Props> = ({
  championName,
  SummonerSpell1,
  SummonerSpell2,
  rune1,
  rune2
}) => {
   const spell2 = summonerSpells[0][`${SummonerSpell2}`];
   const spell1 = summonerSpells[0][`${SummonerSpell1}`];

  return (
    <Flex
      flexWrap="wrap"
      padding="10px"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <Flex>
        <Image
          src={`https://opgg-static.akamaized.net/images/lol/champion/${championName}.png?image=c_scale,q_auto,w_46&v=1628647804`}
          borderRadius="full"
        />
        <Flex flexDirection="column">
          <Tooltip hasArrow label={`${spell1.name}: ${spell1.description}`}>
            <Image
              src={`https://opgg-static.akamaized.net/images/lol/spell/${spell1.id}.png?image=c_scale,q_auto,w_22&v=1628647804`}
              borderRadius="full"
              marginBottom="3px"
            />
          </Tooltip>
          <Tooltip hasArrow label={`${spell2.name}: ${spell2.description}`}>
            <Image
              src={`https://opgg-static.akamaized.net/images/lol/spell/${spell2.id}.png?image=c_scale,q_auto,w_22&v=1628647804`}
              borderRadius="full"
            />
          </Tooltip>
        </Flex>
        <Flex flexDirection="column">
          <Tooltip hasArrow label={``}>
            <Image
              src={`https://opgg-static.akamaized.net/images/lol/perk/${rune1}.png?image=c_scale,q_auto,w_18&v=1628647804`}
              marginBottom="3px"
            />
          </Tooltip>
          <Tooltip hasArrow label={``}>
            <Image
              src={`//opgg-static.akamaized.net/images/lol/perkStyle/8300.png?image=c_scale,q_auto,w_22&v=1628647804`}
            />
          </Tooltip>
        </Flex>
      </Flex>
      <Text as="cite">{championName}</Text>
    </Flex>
  );
};

export default ChampMatch;
