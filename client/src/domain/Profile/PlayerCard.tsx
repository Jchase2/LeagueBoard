import { Flex, Stack, useColorModeValue } from "@chakra-ui/react";
import ChampMatch from "../../components/Match/ChampMatch";
import CSMatch from "../../components/Match/CSMatch";
import { ItemMatch } from "../../components/Match/ItemMatch";
import { KDAMatch } from "../../components/Match/KDAMatch";
import TypeMatch from "../../components/Match/TypeMatch";

interface Props {
  participant: any;
  users: any;
  queue: any;
  gameDuration: number;
}

const PlayerCard: React.FC<Props> = ({
  participant,
  users,
  queue,
  gameDuration,
}) => {
  const loseColor = useColorModeValue("red.300", "red.900");
  const winColor = useColorModeValue("blue.300", "blue.900");
  return (
    <>
      <Stack
        w="100%"
        justifyContent="space-evenly"
        bg={participant?.win ? winColor : loseColor}
        borderRadius="10px"
      >
        {participant?.summonerName === users?.summoner_name && (
          <Flex>
            <TypeMatch
              gameDuration={gameDuration}
              queue={queue}
              win={participant?.win}
              gameTime={participant?.timePlayed}
            />
            <ChampMatch
              championName={participant?.championName}
              SummonerSpell1={participant?.summoner1Id}
              SummonerSpell2={participant?.summoner2Id}
            />
            <KDAMatch
              kills={participant.kills}
              deaths={participant.deaths}
              assists={participant.assists}
            />
            <CSMatch />
            <ItemMatch />
          </Flex>
        )}
      </Stack>
    </>
  );
};

export default PlayerCard;
