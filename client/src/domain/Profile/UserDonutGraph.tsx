import { useEffect, useState} from 'react'
import { CanvasJSChart } from 'canvasjs-react-charts'; 
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Center, Container, Radio, RadioGroup, Stack, Divider } from "@chakra-ui/react"
import { fetchUserInfo, setMatches, fetchMatches } from '../../redux/slices';

const UserDonutGraph = () => {
  const [userDeathHistory, setUserDeathHistory] = useState<any>({});
  const [userKillHistory, setUserKillHistory] = useState<any>({});
  const [userAssistHistory, setUserAssistHistory] = useState<any>({});
  const [userValue, setUserValue] = useState<any>({}) 
  const [graph, setGraph] = useState<any>('');
 
  const user = useAppSelector((state) => state.userReducer.userState);
  const dispatch = useAppDispatch();
  const matches:any = useAppSelector((state) => state.matchReducer.matchState);


  useEffect(() => {
    dispatch(fetchUserInfo()).then(() => {})
    dispatch(fetchMatches()).then(() => {}); 
    dispatch(setMatches()).then(() => {});
  }, [dispatch]);

    useEffect(() => {
      console.log("2nd use effect")
      setUserValue(userKillHistory)
      setGraph("kills")
    }, [userKillHistory])


    useEffect(() => {
      const matchFunction = async () => {

        let current = user.summoner_name;
        let userKills = { avg: 0, high: 0, low: 0 };
        let userDeaths = { avg: 0, high: 0, low: 0 };
        let userAssists = { avg: 0, high: 0, low: 0 };
        let resultArr: any[] = [];
        let kills: any[] = [];
        let deaths: any[] = [];
        let assists: any[] = [];
        
        for (let i: number = 0; i < matches.length; i++) {
          if (matches[i]) {
            let matchInfo = matches[i];
            let participants = matchInfo["participants"];
            participants.forEach((element) => {
              if (element["summonerName"] === current) resultArr.push(element);
            });
          }
        }
        resultArr.forEach((match) => {
          deaths.push(match["deaths"]);
          kills.push(match["kills"]);
          assists.push(match["assists"]);
        });
        if (kills.length !== 0) {
          userKills.high = Math.max(...kills);
          userKills.low = Math.min(...kills);
          userKills.avg = Math.round(
            kills.reduce((a, b) => a + b) / kills.length
          );
          setUserKillHistory(userKills);
        }

        if (deaths.length !== 0) {
          userDeaths.high = Math.max(...deaths);
          userDeaths.low = Math.min(...deaths);
          userDeaths.avg = Math.round(deaths.reduce((a, b) => a + b) / deaths.length);
          setUserDeathHistory(userDeaths);
        }

        if (assists.length !== 0) {
          userAssists.high = Math.max(...assists);
          userAssists.low = Math.min(...assists);
          userAssists.avg = Math.round(assists.reduce((a, b) => a + b) / assists.length);
          setUserAssistHistory(userAssists);
        }
      };
      matchFunction();
    }, [matches]);  
      
      
    const setValue = (value: string) => {
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
        <Divider orientation="horizontal"/>
       
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
              yValueFormatString: "##",
              dataPoints: [
                { name: "avg", y: userValue.avg },
                { name: "low", y: userValue.low },
                { name: "high", y: userValue.high }
              ]
            }]
          } } 

        />
        <Center><h3>kill/death/assist Stats from Past 10 Games</h3></Center>
        </Container>
      
    </div>
  )
}

export default UserDonutGraph