import React from 'react'
import { CanvasJSChart } from 'canvasjs-react-charts';


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
            color: "#3457D5",
            name: "Team-1 Player2",
            indexLabel: "{y}",
            indexLabelFontColor: "white",
            yValueFormatString: "#,###'%'",
            dataPoints: [
              { label: "team1",   y: 85 },
            ]
          },{
            type: "stackedBar100",
            color: "#1E90FF",
            name: "Team-1 Player3",
            indexLabel: "{y}",
            indexLabelFontColor: "white",
            yValueFormatString: "#,###'%'",
            dataPoints: [
              { label: "team1",   y: 85 },
            ]
          },{
            type: "stackedBar100",
            color: "#1877F2",
            name: "Team-1 Player4",
            indexLabel: "{y}",
            indexLabelFontColor: "white",
            yValueFormatString: "#,###'%'",
            dataPoints: [
              { label: "team1",   y: 85 },
            ]
          },{
            type: "stackedBar100",
            color: "#0071c5",
            name: "Team-1 Player5",
            indexLabel: "{y}",
            indexLabelFontColor: "white",
            yValueFormatString: "#,###'%'",
            dataPoints: [
              { label: "team1",   y: 36 },
            ]
          },{
            type: "stackedBar100",
            color: "#e4181e",
            name: "Team-2 Player1",
            indexLabel: "{y}",
            indexLabelFontColor: "white",
            yValueFormatString: "#,###'%'",
            dataPoints: [
              { label: "team2",   y: 34 },
            ]
          },{
            type: "stackedBar100",
            color: "#B7410E",
            name: "Team-2 Player2",
            indexLabel: "{y}",
            indexLabelFontColor: "white",
            yValueFormatString: "#,###'%'",
            dataPoints: [
              { label: "team2",   y: 34 },
            ]
          },{
            type: "stackedBar100",
            color: "#BC3F4A",
            name: "Team-2 Player3",
            indexLabel: "{y}",
            indexLabelFontColor: "white",
            yValueFormatString: "#,###'%'",
            dataPoints: [
              { label: "team2",   y: 34 },
            ]
          },{
            type: "stackedBar100",
            color: "#DA2C43",
            name: "Team-2 Player4",

            indexLabel: "{y}",
            indexLabelFontColor: "white",
            yValueFormatString: "#,###'%'",
            dataPoints: [
              { label: "team2",   y: 34 },
            ]
          },{
            type: "stackedBar100",
            color: "#B7410E",
            name: "Team-2 Player5",

            indexLabel: "{y}",
            indexLabelFontColor: "white",
            yValueFormatString: "#,###'%'",
            dataPoints: [
              { label: "team2",   y: 34 },
            ]
          },{
            type: "stackedBar100",
            color: "blue",
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
            color: "red",
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
