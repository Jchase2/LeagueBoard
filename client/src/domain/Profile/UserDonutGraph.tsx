import { useEffect, useState} from 'react'
import { CanvasJSChart } from 'canvasjs-react-charts';
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Radio, RadioGroup, VStack } from "@chakra-ui/react"
import { fetchUserInfo, setMatches, fetchMatches } from '../../redux/slices';
import './styles.css';

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
      setUserValue(userKillHistory)
      setGraph(" kills ")
    }, [userKillHistory])

    useEffect(() => {
      const matchFunction = async () => {
        let current = user.summoner_name.toLowerCase();
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
              if (element["summonerName"].toLowerCase() === current) resultArr.push(element);
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
    }, [matches, user?.summoner_name]);

    const setValue = (value: string) => {
      if (value === ' kills ') {
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

  const options = {
    width:230,
    height:230,
    colorSet:  "customColorSet1",
    theme: "light2",
    title: {
      text: `Stat Averages`,
      fontColor: "#b5b5c6",
    },
    subtitles: [{
      text: graph,
      verticalAlign: "center",
      fontSize: 24,
      dockInsidePlotArea: true
    }],
    backgroundColor: "transparent",
    data: [{
      type: "doughnut",
      yValueFormatString: "##",
      dataPoints: [
        { name: "avg", y: userValue.avg },
        { name: "low", y: userValue.low },
        { name: "high", y: userValue.high }
      ]
    }]
  };

  return (
    <>
    <div>
      <div>
        <CanvasJSChart id="chart" options={options}/>
      </div>
      <RadioGroup
        id="radioList"
        defaultValue={" kills "}
        onChange={(value) => setValue(value)}>
        <VStack>
          <Radio value=" kills ">kills</Radio>
          <Radio value="deaths">deaths</Radio>
          <Radio value="assists">assists</Radio>
        </VStack>
      </RadioGroup>
      </div>
    </>
  );
}

export default UserDonutGraph