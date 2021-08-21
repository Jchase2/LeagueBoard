/* eslint-disable no-loop-func */
import { useEffect, useState } from 'react'
import { CanvasJSChart } from 'canvasjs-react-charts';
import { Container, Center, Divider } from "@chakra-ui/react"
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { fetchUserInfo, setMatches, fetchMatches } from '../../../../redux/slices';


const ParticipationGraph = () => {
  const [userMatches, setUserMatches] = useState<any[]>([]);
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
    console.log("matches", matches)
    setUserMatches(userParticipation);
  }, [userParticipation])

 

    useEffect(() => {
      const match = async () => {
        let usersTeam: number;

        let currentUser = {
          killAvg: 0,
          assistAvg: 0,
          participation: 0,
        };
        let currentTeam = {
          killAvg: 0,
          assistAvg: 0,
          participation: 0,
        };

        let current = user.summoner_name;
        let resultArr: any[] = [];
        let teamArr: any[] = [];
        let kills: any[] = [];
        let assists: any[] = [];
        let teamTotalkills: any[] = [];
        let teamTotalassists: any[] = [];
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
        console.log(teamArr, "teamArr", resultArr, "resultArr");

        teamArr.forEach((match) => {
          teamTotalkills.push(match["kills"]);
          teamTotalassists.push(match["assists"]);
        });
        resultArr.forEach((match) => {
          kills.push(match["kills"]);
          assists.push(match["assists"]);
        });

        if (kills.length !== 0) {
          let a = 0;
          let b = 0;
          for (let i: number = 0; i < kills.length; i++) {
            a += kills[i];
          }
          for (let i: number = 0; i < teamTotalkills.length; i++) {
            b += teamTotalkills[i];
          }
          currentTeam.killAvg = Math.round((b + a) / a);

          currentUser.killAvg = Math.round(
            kills.reduce((a, b) => a + b) / kills.length
          );

          console.log(currentUser.killAvg, currentTeam.killAvg);
        }

        if (assists.length !== 0) {
          let a = 0;
          let b = 0;
          for (let i: number = 0; i < assists.length; i++) {
            a += assists[i];
          }
          for (let i: number = 0; i < teamTotalassists.length; i++) {
            b += teamTotalassists[i];
          }
          currentTeam.assistAvg = Math.round((b + a) / a);

          currentUser.assistAvg = Math.round(
            assists.reduce((a, b) => a + b) / assists.length
          );
        }
        console.log(currentUser.assistAvg, currentTeam.assistAvg);
      };

      match();
    }, [matches]);
    
    
   


  
  return (
    <div>
      <Container>
      <CanvasJSChart
          options={{
            colorSet:  "customColorSet1",
            theme: "light2",
            title: {
              text: ``,
              fontColor: "#b5b5c6",
            },
            subtitles: [{
              
              verticalAlign: "center",
              fontSize: 24,
              dockInsidePlotArea: true
            }],
            
            backgroundColor: "#ffffff",
            data: [{
              type: "doughnut",
              yValueFormatString: "##",
              dataPoints: [
                { name: "avg", y: 8 },
                { name: "low", y: 7},
                { name: "high", y: 8 }
              ]
            }]
          } } 

        />
        <Center><h3>kill/death/assist Stats from Past 10 Games</h3></Center>
      </Container>
      
    </div>
  )
}

export default ParticipationGraph;


