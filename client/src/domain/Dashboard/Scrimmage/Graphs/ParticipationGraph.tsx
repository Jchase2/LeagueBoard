import React, { useEffect, useState} from 'react'
import { CanvasJSChart } from 'canvasjs-react-charts';
import { getRecentMatches } from '../../../../api/backendApi';
import { useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { getUserMatches } from '../../../../api/profileAPI';
import { allMatches2 } from './matchData2';
import { Container, Radio, RadioGroup, Stack, Divider } from "@chakra-ui/react"

const ParticipationGraph = ({team1, team2}:any) => {
  const [userHistory, setUserHistory] = useState<any[]>([])
  const [userMatches, setuserMatches] = useState<any[]>([])

  const [userValue, setUserValue] = useState<any>({}) 
  const [graph, setGraph] = useState<any>('');
  


 /*    useEffect(() => {
      console.log("2nd use effect")
      setUserValue(userKillHistory)
      setGraph("kills")
    }, [userKillHistory])
 */

    useEffect(() => {
      /* let currentUser = '';
      let decoded: any
      const user: string | null = localStorage.getItem("accessToken");
      if (user) {
        decoded = jwt_decode(user);
      } */
      const match = async () => {
         /* currentUser = decoded?.user.summoner_name;
        console.log(currentUser)
        let array:any = [];
        getUserMatches(decoded?.user?.puuid).then(async (res) => {
          
          setUserHistory(await array)
        } ); */
         
        let current = 'Zero Brane';
        let currentPlayerId = {player:0, team:0}
          let userParticipation = { avg: 0}
          let user = {current:
             {kills: {avg: 0, high: 0, low: 0},  assists: {avg: 0, high: 0, low: 0}},
            userTeam:
             {kills: {teamTotalAvg: 0, teamAvgWithoutCurrent: 0, avg: 0}, assists: {teamTotalAvg: 0, avg: 0} }};

          let j:number = 0;
          let resultArr:any[] = [];
          let teamArr:any[] = [];
          let kills:any[] = [];
          let assists:any[] = [];
          let teamTotalkills:any[] = [];
          let teamTotalassists:any[] = [];
          for (let i:number = 0; i < allMatches2.length; i++) {
            let matchInfo = allMatches2[i][j];
            let currentParticipants = matchInfo["participantIdentities"];

            currentParticipants.forEach(element => {
              if (element['player']['summonerName'] === current) {
                currentPlayerId.player = element["participantId"];
              } 
            });
            let participants = matchInfo['participants'];
            participants.forEach(element => {
              if (element["participantId"] === currentPlayerId.player) {
                resultArr.push(element);
                currentPlayerId.team = element["teamId"];
              }  
            });
            participants.forEach(element => {
              if (element["participantId"] !== currentPlayerId.player && element["teamId"] === currentPlayerId.team) {
                teamArr.push(element);
              }  
            });
            j++;
          }
          console.log(teamArr, resultArr)
          teamArr.forEach((match) => {
            teamTotalkills.push(match["stats"]["kills"]);
            teamTotalassists.push(match["stats"]["assists"]);
          });
          resultArr.forEach((match) => {
            kills.push(match["stats"]["kills"]);
            assists.push(match["stats"]["assists"]);

          });


          if (kills.length !== 0) {
            let teamKillAvg = 0;
            for (let i:number = 0; i < teamTotalkills.length; i++) {
              teamKillAvg += teamTotalkills[i];
            }
            user.userTeam.kills.avg = (teamKillAvg / resultArr.length)
            console.log(user.userTeam.kills.avg)
            user.current.kills.high = Math.max(...kills);
            user.current.kills.low = Math.min(...kills);
            user.current.kills.avg = Math.round(
              kills.reduce((a, b) => a + b) / kills.length
            );

            resultArr.slice(0, resultArr.length - 1);
          }
        
        
        if (assists.length !== 0) {
          
          let userAssistAvg = 0;
          let teamAssistAvg = 0;
          for (let i:number = 0; i < assists.length; i++) { 
            userAssistAvg += assists[i];
          }
          for (let i:number = 0; i < teamTotalassists.length; i++) {
            teamAssistAvg += (teamTotalassists[i]);
          }
          let total = (userAssistAvg) + (teamAssistAvg);
          console.log(total, userAssistAvg, teamAssistAvg);
          
          user.userTeam.assists.avg = (teamAssistAvg / (resultArr.length + teamArr.length))
          user.current.assists.high = Math.max(...assists);
          user.current.assists.low = Math.min(...assists);
          user.current.assists.avg = Math.round(assists.reduce((a, b) => (a + b)) / assists.length);

        }
        console.log(user)
      }
      
      
      match();
      
    }, [])
    
    
   


  
  return (
    <div>
      <Container>
        <RadioGroup defaultValue={'kills'} onChange={(value) => setValue(value)}>
          <Stack direction="row">
            <Divider orientation="vertical" />
            <Radio value="kills">kills</Radio>
            <Radio value="deaths">deaths</Radio>
            <Radio value="assists">assists</Radio>
           
          </Stack>
        </RadioGroup>

        <Divider orientation="vertical" />

         <CanvasJSChart
          options={{
            colorSet:  "customColorSet1",
            theme: "light2",
            title: {
              text: ``,
              fontColor: "#b5b5c6",
            },
            subtitles: [{
              text: graph,
              verticalAlign: "center",
              fontSize: 24,
              dockInsidePlotArea: true
            }],
            
            backgroundColor: "#ffffff",
            data: [{
              type: "doughnut",
              //indexLabel: "{name}: {y}",
              yValueFormatString: "##",
              dataPoints: [
                { name: "avg", y: userValue.avg },
                { name: "low", y: userValue.low },
                { name: "high", y: userValue.high }
              ]
            }]
          } } 

        />

        </Container>
      
    </div>
  )
}

export default ParticipationGraph;


