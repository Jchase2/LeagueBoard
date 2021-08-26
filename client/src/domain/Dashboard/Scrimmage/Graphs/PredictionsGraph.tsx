import {useState, useEffect} from 'react'
import { CanvasJSChart } from 'canvasjs-react-charts';
import { Grid, GridItem  } from "@chakra-ui/react"
import '../layoutStyles.css'

const PredictionsGraph = ({ scrim }: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [teamOne, setTeamOne] = useState<any>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [teamTwo, setTeamTwo] = useState<any>([]);
  const [teams, setTeams] = useState<any>({});

  useEffect(() => {
    if (scrim.player1info) {
      const newTeamOne: any[] = [];
      const newTeamTwo: any[] = [];
      for (let i = 1; i <= 10; i++) {
        const rankedInfo = scrim[`player${i}ranked`]
          .map((info) => {
            const newInfo = {
              queueType: info.queueType,
              losses: info.losses,
              rank: info.rank,
              tier: info.tier,
              wins: info.wins,
            };
            return newInfo;
          })
          .sort((a, b) => (a.queueType === "RANKED_SOLO_5x5" ? -1 : 1));
        let player = {
          name: scrim[`player${i}`],
          info: scrim[`player${i}info`],
          ranked: rankedInfo.length ? rankedInfo[0] : undefined,
        };
        if (i <= 5) {
          newTeamOne.push(player);
        } else {
          newTeamTwo.push(player);
        }
      }
      const predict = (newTeamOne, newTeamTwo) => {
        let array1: any[] = [];
        let array2: any[] = [];
        let teamsInfo = {
          team1BattleWinAvg: 0,
          team1Wins: 0,
          team1Losses: 0,
          team2BattleWinAvg: 0,
          team2Wins: 0,
          team2Losses: 0,
        };
        newTeamOne.forEach((player) => {
          let ratio = {
            avg: player.ranked
              ? player.ranked.wins / (player.ranked.wins + player.ranked.losses)
              : 0,
            wins: player.ranked ? player.ranked.wins : 0,
            losses: player.ranked ? player.ranked.losses : 0,
          };
          array1.push(ratio);
        });
        newTeamTwo.forEach((player) => {
          let ratio = {
            avg: player.ranked
              ? player.ranked.wins / (player.ranked.wins + player.ranked.losses)
              : 0,
            wins: player.ranked ? player.ranked.wins : 0,
            losses: player.ranked ? player.ranked.losses : 0,
          };
          array2.push(ratio);
        });

        array1.forEach((player) => {
          teamsInfo.team1Wins += player.wins;
          teamsInfo.team1Losses += player.losses;
          teamsInfo.team1BattleWinAvg += player.avg;
        });
        array2.forEach((player) => {
          teamsInfo.team2Wins += player.wins;
          teamsInfo.team2Losses += player.losses;
          teamsInfo.team2BattleWinAvg += player.avg;
        });

        console.log(teamsInfo);
        setTeams(teamsInfo);
      };
      predict(newTeamOne, newTeamTwo);
      setTeamOne(newTeamOne);
      setTeamTwo(newTeamTwo);
    }
  }, [scrim]);

  return (

    <Grid templateColumns="repeat(2, 1fr)" gap={10} maxWidth="752px" width="100%">
      <GridItem>
      <CanvasJSChart
        options={{
          height: 200,
          title: {
            text: "Win/Loss Avg's",
          },
          toolTip: {
            shared: true,
          },
          legend: {
            verticalAlign: "top",
          },
          data: [
            {
              type: "column",
              name: "Wins",
              legendText: "Player Win Avg",
              indexLabelFontColor: "white",
              yValueFormatString: "##",
              showInLegend: true,
              dataPoints: [
                { label: scrim.team1, y: teams.team1Wins / 5 },
                { label: scrim.team2, y: teams.team2Wins / 5 },
              ],
            },
            {
              type: "column",
              name: "Losses",
              legendText: "Player Loss Avg",
              showInLegend: true,
              indexLabelFontColor: "white",
              yValueFormatString: "##",
              dataPoints: [
                { label: scrim.team1, y: teams.team1Losses / 5 },
                { label: scrim.team2, y: teams.team2Losses / 5 },
              ],
            },
          ],
        }}/>
      </GridItem>

      <GridItem>
      <CanvasJSChart
        options={{
          height: 200,
          title: {
            text: "Win Expectancy",
          },
          toolTip: {
            shared: true,
          },
          legend: {
            verticalAlign: "top",
          },
          data: [
            {
              type: "column",
              name: scrim.team1,
              legendText: scrim.team1,
              showInLegend: true,
              dataPoints: [
                { label: "team to win", y: teams.team1BattleWinAvg },
              ],
            },
            {
              type: "column",
              name: scrim.team2,
              showInLegend: true,
              indexLabelFontColor: "white",
              dataPoints: [
                { label: "team to win", y: teams.team2BattleWinAvg },
              ],
            },
          ],
        }}/>
      </GridItem>
    </Grid>

  );
};

export default PredictionsGraph;
