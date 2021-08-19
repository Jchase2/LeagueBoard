import React, { useEffect, useState} from 'react'
import { CanvasJSChart } from 'canvasjs-react-charts';
import { getRecentMatches } from '../../../../api/backendApi';
import { useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { getUserMatches } from '../../../../api/profileAPI';
import { allMatches } from './matchData';
import { Container, Radio, RadioGroup, Stack } from "@chakra-ui/react"

const DonutGraph = ({team1, team2}:any) => {
  const [userHistory, setUserHistory] = useState<any[]>([])
  const [userMatches, setuserMatches] = useState<any[]>([])
  const [userDeathHistory, setUserDeathHistory] = useState<any>({});
  const [userKillHistory, setUserKillHistory] = useState<any>({});
  const [userAssistHistory, setUserAssistHistory] = useState<any>({});
  const [userValue, setUserValue] = useState<any>({}) 
  const [graph, setGraph] = useState<any>('');
  
  console.log(userDeathHistory, userKillHistory, userAssistHistory);

    useEffect(() => {
      console.log("2nd use effect")
      setUserValue(userKillHistory)
      setGraph("kills")
    }, [userKillHistory])


    useEffect(() => {
      let currentUser = '';
      let decoded: any
      const user: string | null = localStorage.getItem("accessToken");
      if (user) {
        decoded = jwt_decode(user);
      }
      const match = async () => {
         currentUser = decoded?.user.summoner_name;
        console.log(currentUser)
        let array:any = [];
        getUserMatches(decoded?.user?.puuid).then(async (res) => {
          
          setUserHistory(await array)
        } );
         
        //let current = 'demon6kitty2';
        
          let userKills = {avg: 0, high: 0, low: 0};
          let userDeaths = {avg: 0, high: 0, low: 0};
          let userAssists = {avg: 0, high: 0, low: 0};
          let j:number = 0;
          let resultArr:any[] = [];
          let kills:any[] = [];
          let deaths:any[] = [];
          let assists:any[] = [];
          for (let i:number = 0; i < userMatches.length; i++) {
            console.log(userMatches)
            let matchInfo = userMatches[i][j];
            let participants = matchInfo.info['participants'];
            participants.forEach(element => {
              if (element['summonerName'] === currentUser) resultArr.push(element); 
            });  
            j++;
          }
        resultArr.forEach(match => {
          kills.push(match['kills'])
        })
        if (kills.length !== 0) {
          userKills.high = Math.max(...kills);
          userKills.low = Math.min(...kills);
          userKills.avg = Math.round(kills.reduce((a, b) => (a + b)) / kills.length); 
          
          setUserKillHistory(userKills);
        }
        
  
        resultArr.forEach(match => {
          deaths.push(match['deaths'])
        })
        if (deaths.length !== 0) {
          userDeaths.high = Math.max(...deaths);
          userDeaths.low = Math.min(...deaths);
          console.log(...deaths)
          userDeaths.avg = deaths.reduce((a, b) => (a + b)) / deaths.length;
          setUserDeathHistory(userDeaths);
        }
  
        resultArr.forEach(match => {
          assists.push(match['assists'])
        })
        if (assists.length !== 0) {
          userAssists.high = Math.max(...assists);
          userAssists.low = Math.min(...assists);
          userAssists.avg = assists.reduce((a, b) => (a + b)) / assists.length;
          setUserAssistHistory(userAssists);
        }
        
        }
        
      
      match();
      
    }, [])
    
    
   
    
    const setValue = (value: string) => {
      console.log("set value", value)
      if (value === 'kills') {
        setUserValue(userKillHistory)
        setGraph(value)
      }
      if (value === 'deaths') {
        setUserValue(userDeathHistory)
        setGraph(value)
      }
      if (value === 'assists') {
        setUserValue(userAssistHistory)
        setGraph(value)
      }
      
    };


  
  return (
    <div>
      <Container>
        <RadioGroup defaultValue={'kills'} onChange={(value) => setValue(value)}>
          <Stack direction="row">
            <Radio value="kills">kills</Radio>
            <Radio value="deaths">deaths</Radio>
            <Radio value="assists">assists</Radio>
          </Stack>
        </RadioGroup>
        {console.log(userValue)}
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

export default DonutGraph


