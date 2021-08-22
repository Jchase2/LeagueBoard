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
  teamkills1 : any;
  teamkills2 : any;
}

const PlayerCard: React.FC<Props> = ({
  participant,
  users,
  queue,
  gameDuration,
  teamId1,
  teamId2,
  teamkills1,
  teamkills2,
}) => {
  const loseColor = useColorModeValue("red.200", "red.900");
  const winColor = useColorModeValue("blue.200", "blue.900");
  const [isLargerThan] = useMediaQuery("(max-width:760px)");
  let totalKill = 0
  //Check if win == teamId and return the kills inside
  // pass down total team kills along with the boolean to check and display
  if (participant?.win === teamId1) {totalKill = teamkills1;}
  if (participant?.win === teamId2) {totalKill = teamkills2;}

  return (
    <>
      <Stack
        w="100%"
        justifyContent="space-evenly"
        bg={participant?.win ? winColor : loseColor}
        borderRadius="20px"
      >
        {participant && (
          <>
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
                  rune1={participant?.perks?.styles[0]?.selections[0]?.perk}
                  rune2={participant?.perks?.styles[1]?.style}
                />
                <KDAMatch
                  kills={participant?.kills}
                  deaths={participant?.deaths}
                  assists={participant?.assists}
                />
                {!isLargerThan &&
                <CSMatch
                  champLevel={participant?.champLevel}
                  totalMinionsKilled={participant?.totalMinionsKilled}
                  gameDuration={gameDuration}
                  kills={participant?.kills}
                  totalKill={totalKill}
                  assists={participant?.assists}
                />}
                <ItemMatch
                  item0={participant?.item0}
                  item1={participant?.item1}
                  item2={participant?.item2}
                  item3={participant?.item3}
                  item4={participant?.item4}
                  item5={participant?.item5}
                  item6={participant?.item6}
                />
              </Flex>
            )}
          </>
        )}
      </Stack>
    </>
  );
};

export default PlayerCard;
