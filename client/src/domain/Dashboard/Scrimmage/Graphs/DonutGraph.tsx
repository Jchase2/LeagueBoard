import React, { useEffect, useState} from 'react'
import { CanvasJSChart } from 'canvasjs-react-charts';
import { allMatches } from './matchData';
import { Container, Radio, RadioGroup, Stack, Divider } from "@chakra-ui/react"
import { fetchUserInfo, setMatches, fetchMatches } from '../../../../redux/slices';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';

const DonutGraph = () => {
  const [userHistory, setUserHistory] = useState<any[]>([])
  const [userMatches, setUserMatches] = useState<any[]>([])
  const [userName, setUserName] = useState<any>('');
  const [userDeathHistory, setUserDeathHistory] = useState<any>({});
  const [userKillHistory, setUserKillHistory] = useState<any>({});
  const [userAssistHistory, setUserAssistHistory] = useState<any>({});
  const [userValue, setUserValue] = useState<any>({}) 
  const [graph, setGraph] = useState<any>('');
  
  const user = useAppSelector((state) => state.userReducer.userState);
  const dispatch = useAppDispatch();
  const matches:any = useAppSelector((state) => state.matchReducer.matchState);
  

  useEffect(() => {
    
    dispatch(fetchUserInfo()).then(() => {return user})
    dispatch(fetchMatches()).then(() => {return}); 
    dispatch(setMatches()).then(() => {return matches});

  }, [dispatch]);


  console.log(user, "user", matches, "matches")



  //console.log(userHistory, "userHistory")

    useEffect(() => {
      console.log("2nd use effect")
      setUserValue(userKillHistory)
      setGraph("kills")
    }, [userKillHistory])


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
         
        let current = 'demon6kitty2';
        
          let userKills = {avg: 0, high: 0, low: 0};
          let userDeaths = {avg: 0, high: 0, low: 0};
          let userAssists = {avg: 0, high: 0, low: 0};
          let j:number = 0;
          let resultArr:any[] = [];
          let kills:any[] = [];
          let deaths:any[] = [];
          let assists:any[] = [];
          for (let i:number = 0; i < allMatches.length; i++) {

            let matchInfo = allMatches[i][j];
            let participants = matchInfo.info['participants'];
            participants.forEach(element => {
              if (element['summonerName'] === current) resultArr.push(element); 
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
          //console.log(...deaths)
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

export default DonutGraph


