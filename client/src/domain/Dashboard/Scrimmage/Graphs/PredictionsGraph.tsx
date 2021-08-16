import React from 'react'
import { CanvasJSChart } from 'canvasjs-react-charts';

interface Props {
  
}

const PredictionsGraph = ({team1, team2}) => {
  return (
    <div>
      <CanvasJSChart
        options={ {
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
            color: "#9bbb59",
            name: "Team1 player1",
            showInLegend: true,
            indexLabel: "{y}",
            indexLabelFontColor: "white",
            yValueFormatString: "#,###'%'",
            dataPoints: [
              { label: "team1",   y: 85 },
              { label: "team2",   y: 34 },
             
            ]
          },{
            type: "stackedBar100",
            color: "#9bbb59",
            name: "Team1 player2",
            showInLegend: true,
            indexLabel: "{y}",
            indexLabelFontColor: "white",
            yValueFormatString: "#,###'%'",
            dataPoints: [
              { label: "team1",   y: 85 },
              { label: "team2",   y: 34 },
             
            ]
          },{
            type: "stackedBar100",
            color: "blue",
            name: "player 3",
            showInLegend: true,
            indexLabel: "{y}",
            indexLabelFontColor: "white",
            yValueFormatString: "#,###'%'",
            dataPoints: [
              { label: "team1",   y: 85 },
              { label: "team2",   y: 34 },
             
            ]
          },{
            type: "stackedBar100",
            color: "red",
            name: "player 4",
            showInLegend: true,
            indexLabel: "{y}%",
            indexLabelFontColor: "white",
            yValueFormatString: "#,###'%'",
            dataPoints: [
              { label: "team1",   y: 15 },
              { label: "team2",   y: 54 },
            ]
          },{
            type: "stackedBar100",
            color: "blue",
            name: "team1",
            showInLegend: true,
            indexLabel: "{y}%",
            indexLabelFontColor: "white",
            yValueFormatString: "#,###'%'",
            dataPoints: [
              { label: "team1",   y: 15, },
              { label: "team2",   y: 21 },
              { label: "win predection",   y: 21}
            ]
          },{
            type: "stackedBar100",
            color: "red",
            name: "team1",
            showInLegend: true,
            indexLabel: "{y}%",
            indexLabelFontColor: "white",
            yValueFormatString: "#,###'%'",
            dataPoints: [
              { label: "team1",   y: 15, },
              { label: "team2",   y: 21, },
              { label: "win predection",   y: 79, }
            ]
          }]
          
        } }
      />
    </div>
  )
}

export default PredictionsGraph
