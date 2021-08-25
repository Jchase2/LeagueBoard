import { Flex, Text, useColorModeValue, useMediaQuery } from "@chakra-ui/react";
import { CanvasJSChart } from "canvasjs-react-charts";
import { KDAMatch } from "../../components/Match/KDAMatch";

interface Props {
  matches: any;
  user: any;
}
const Graph: React.FC<Props> = ({ matches, user }) => {
  const textcolor = useColorModeValue("#2F4F4F", "#F0FFFF");
   const [isSmallerThan] = useMediaQuery("(max-width:450px)");
  // use function to get the most occured role, afterwards filter that word out and do it again to get the two most common roles
  let W = 0;
  let L = 0;
  let kills = 0;
  let assists = 0;
  let deaths = 0;
  let teamkills = 0;
  let teamId1: boolean
  let height = (!isSmallerThan ? "110" : "50");

  matches?.forEach((match) => {
    match.participants.forEach((participant) => {
      teamId1 = match?.teams[0]?.win;
      if (
        participant?.summonerName?.toLowerCase() ===
        user?.summoner_name?.toLowerCase()
      ) {
        kills += participant.kills;
        assists += participant.assists;
        deaths += participant.deaths;
        if (participant.win) {
          W += 1;
        } else L += 1;
        if(participant.win && teamId1) {
          teamkills += match?.teams[0]?.objectives?.champion?.kills;
        } else teamkills += match?.teams[1]?.objectives?.champion?.kills;
      }
    });
  });

  W *= 10;
  L *= 10;
  let percent = W + "%";

  const options = {
    animationEnabled: true,
    subtitles: [
      {
        text: percent,
        fontColor: textcolor,
        verticalAlign: "center",
        fontSize: 20,
        dockInsidePlotArea: true,
      },
    ],
    height: height,
    width: 140,
    backgroundColor: "transparent",
    data: [
      {
        type: "doughnut",
        yValueFormatString: "#,###'%'",
        dataPoints: [
          { name: "Wins", y: W },
          { name: "Loses", y: L },
        ],
      },
    ],
  };

  return (
    <>
      <Flex flexDirection="column">
        <Text paddingLeft="30px" fontSize="sm" minW="100px">
          10G {W / 10}W {L / 10}L
        </Text>
        <CanvasJSChart options={options} />
      </Flex>
      <Flex
        minW="250px"
        paddingRight="50px"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Text>
          {kills} / {deaths} / {assists}
        </Text>
        <Text
          textAlign="center"
          color={useColorModeValue("red.900", "red.200")}
        >
          {`${((kills + assists) / deaths).toFixed(2)}`} P/Kill{" "}
          {(((kills + assists) / teamkills) * 100).toFixed()}%
        </Text>
      </Flex>
    </>
  );
};

export default Graph;
