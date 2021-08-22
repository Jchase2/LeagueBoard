/* eslint-disable no-loop-func */
import { useEffect, useState } from 'react'
import { CanvasJSChart } from 'canvasjs-react-charts';
import { Box } from "@chakra-ui/react"
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchUserInfo, setMatches, fetchMatches } from '../../redux/slices';

const ParticipationGraph = () => {
  const [userMatches, setUserMatches] = useState<any>({});
  const [userParticipation, setUserParticipation] = useState<any>({});

  const user = useAppSelector((state) => state.userReducer.userState);
  const dispatch = useAppDispatch();
  const matches:any = useAppSelector((state) => state.matchReducer.matchState);

  useEffect(() => {
    dispatch(fetchUserInfo()).then(() => {})
    dispatch(fetchMatches()).then(() => {}); 
    dispatch(setMatches()).then(() => {});
  }, [dispatch]);

  useEffect(() => {
    setUserMatches(userParticipation);
  }, [userParticipation])


    useEffect(() => {
      const match = async () => {
        let usersTeam: number;
        let participation = {user: 0, team: 0}
        let current = user.summoner_name;
        let resultArr: any[] = [];
        let teamArr: any[] = [];
        let kills: any[] = [];
        let assists: any[] = [];
        let teamTotalkills: any[] = [];
        for (let i: number = 0; i < matches.length; i++) {
          if (matches[i]) {
            let matchInfo = matches[i];
            let currentparticipants = matchInfo["participants"];
            let participants = matchInfo["participants"];
            participants.forEach((element) => {
              if (element["summonerName"] === current) {
                usersTeam = element["teamId"];
                resultArr.push(element);
              }
            });
            currentparticipants.forEach((element) => {
              if (
                element["summonerName"] !== current &&
                element["teamId"] === usersTeam
              ) {
                teamArr.push(element);
              }
            });
          }
        }
        teamArr.forEach((match) => {
          teamTotalkills.push(match["kills"]);
        });
        resultArr.forEach((match) => {
          kills.push(match["kills"]);
          assists.push(match["assists"]);
        });
        let userTotal = 0;
        let teamTotal = 0;
        kills.forEach((kill) => {
          teamTotal+=kill;
          userTotal+=kill;
        });
        teamTotalkills.forEach((kill) => {
          teamTotal+=kill;
        });
        assists.forEach((kill) => {
          userTotal+=kill;
        });

        participation.user = Number((100*(userTotal/teamTotal)).toFixed())
        participation.team = (100 - participation.user);
        setUserParticipation(participation);
      };
      match();
    }, [matches]);

  
  return (
    <div>
      <Box>
        <CanvasJSChart
          options={{
            width: 230,
            height: 230,
            colorSet: "customColorSet1",
            theme: "light2",
            title: {
              text: `Participation Percentage`,
              fontColor: "#b5b5c6",
            },
            subtitles: [
              {
                text: "participation",
                verticalAlign: "center",
                fontSize: 16,
                dockInsidePlotArea: true,
              },
            ],
            backgroundColor: "transparent",
            data: [
              {
                type: "doughnut",
                yValueFormatString: "##%",
                dataPoints: [
                  { name: "user", y: userMatches.user / 100 },
                  { name: "team", y: userMatches.team / 100 },
                ],
              },
            ],
          }}
        />
      </Box>
    </div>
  );
}

export default ParticipationGraph;


