import {useState, useEffect} from 'react'
import { CanvasJSChart } from 'canvasjs-react-charts';
import { Divider } from "@chakra-ui/react"
import { IScrimmage } from '../../../../interfaces/Scrimmage';

const PredictionsGraph = ({scrim}:any) => {
  const [teamOne, setTeamOne] = useState<any>([])
  const [teamTwo, setTeamTwo] = useState<any>([])


  useEffect(() => {
    if (scrim.player1info) {
    let app:any[] = [];
    app.push(Object.values(scrim));
    if (app.length === 48) {
      const newTeamOne: any[] = []
      const newTeamTwo: any[] = []
      for (let i = 1; i <= 10; i++) {
        const rankedInfo = scrim[`player${i}ranked`].map(info => {
          const newInfo = {
            queueType: info.queueType,
            losses: info.losses,
            rank: info.rank,
            tier: info.tier,
            wins: info.wins,
          }
          return newInfo
        }).sort((a, b) => (a.queueType === 'RANKED_SOLO_5x5' ? -1 : 1))
        let player = {
          name: scrim[`player${i}`],
          info: scrim[`player${i}info`],
          ranked: rankedInfo.length ? rankedInfo[0] : undefined
        }
        if (i <= 5) {
          newTeamOne.push(player)
        } else {
          newTeamTwo.push(player)
        }
      }
      const predict = () => {

      }
      newTeamOne.sort((a, b) => {
        return b.ranked.rank - a.ranked.rank;
      })
      newTeamTwo.sort((a, b) => {
        return b.ranked.rank - a.ranked.rank;
      })
      setTeamOne(newTeamOne);
      setTeamTwo(newTeamTwo);
    }
    }
  }, [scrim])

  




  return (
    <div>
      <Divider orientation="horizontal"></Divider>
      <CanvasJSChart
        options={ {
          backgroundColor: "transparent",
          title: {
            text: "team1 vs team2"
          },
          toolTip: {
            shared: true
          },
          legend: {
            verticalAlign: "top"
          },
          axisY: {
            suffix: "%"
          },
          data: [{
            type: "stackedBar100",
            color: "#5072A7",
            name: "Team-1 Player1",
            indexLabel: "{y}",
            indexLabelFontColor: "white",
            yValueFormatString: "#,###'%'",
            dataPoints: [
              { label: "team1",   y: 85 },
            ]
          },{
            type: "stackedBar100",
            color: "#B7410E",
            name: "Team-2 Player5",

            indexLabel: "{y}",
            indexLabelFontColor: "white",
            yValueFormatString: "#,###'%'",
            dataPoints: [
              { label: "team2",   y: 13 },
            ]
          },{
            type: "stackedBar100",
            color: "#B7410E",
            name: "team1",
            showInLegend: true,
            indexLabel: "{y}",
            indexLabelFontColor: "white",
            yValueFormatString: "#,###'%'",
            dataPoints: [
              { label: "Team 1"},
              { label: "team2",   y: 21 },
              { label: "win predection",   y: 21}
            ]
          },{
            type: "stackedBar100",
            color: "#5072A7",
            name: "team2",
            showInLegend: true,
            indexLabel: "{y}",
            indexLabelFontColor: "white",
            yValueFormatString: "#,###'%'",
            dataPoints: [
              { label: "team1",   y: 15, },
              
              { label: "team2",   y: 29, },
              { label: "win predection",   y: 79, }
            ]
          }]
          
        } }
      />
    </div>
  )
}

export default PredictionsGraph