import {
  Flex,
  Stack,
  useColorModeValue,
  useMediaQuery,
} from "@chakra-ui/react";
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
  teamId1: boolean;
  teamId2: boolean;
}

const PlayerCard: React.FC<Props> = ({
  participant,
  users,
  queue,
  gameDuration,
}) => {
  const loseColor = useColorModeValue("red.300", "red.800");
  const winColor = useColorModeValue("blue.300", "blue.800");
  const [isLargerThan] = useMediaQuery("(max-width:500px)");
  //Check if win == teamId and return the kills inside
  // pass down total team kills along with the boolean to check and display
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
            {!isLargerThan && (
              <TypeMatch
                gameDuration={gameDuration}
                queue={queue}
                win={participant?.win}
                gameTime={participant?.timePlayed}
              />
            )}
            <ChampMatch
              championName={participant?.championName}
              SummonerSpell1={participant?.summoner1Id}
              SummonerSpell2={participant?.summoner2Id}
              rune1={participant?.perks.styles[0].selections[0].perk}
              rune2={participant?.perks.styles[1].style}
            />
            <KDAMatch
              kills={participant.kills}
              deaths={participant.deaths}
              assists={participant.assists}
            />
            <CSMatch
              champLevel={participant.champLevel}
              totalMinionsKilled={participant.totalMinionsKilled}
              gameDuration={gameDuration}
            />
            <ItemMatch />
          </Flex>
        )}
      </Stack>
    </>
  );
};

export default PlayerCard;
