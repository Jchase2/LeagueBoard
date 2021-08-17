import React, {useEffect} from 'react'
import { CanvasJSChart } from 'canvasjs-react-charts';


const DonutGraph = ({team1, team2}:any) => {

  useEffect(() => {

    const the = async () => {
      const data1 = await team1;
      const data2 = await team2;
      console.log(data1, data2)
    }
    
    the();
  }, [team1, team2])


  
  
  return (
    <div>
      <CanvasJSChart
        options={ {
          colorSet:  "customColorSet1",
          theme: "light2", // "light1", "light2", "dark1", "dark2"
	        title: {
		        text: ``,
            fontColor: "#b5b5c6",
	        },
          subtitles: [{
            text: "Kill Rate",
            verticalAlign: "center",
            fontSize: 24,
            dockInsidePlotArea: true
          }],
          
          backgroundColor: "#ffffff",
          data: [{
            type: "doughnut",
            indexLabel: "{name}: {y}",
            yValueFormatString: "#,###'%'",
            dataPoints: [
              { name: "Avg-kill-rate", y: 5 },
              { name: "lowest-kill-rate", y: 31 },
              { name: "highest-kill-rate", y: 40 }
            ]
          }]
        } }
      />
    </div>
  )
}

export default DonutGraph
