import React, {useEffect, useState} from 'react'
import { CanvasJSChart } from 'canvasjs-react-charts';
import { getRecentMatches } from '../../../../api/backendApi';
import { useSelector } from 'react-redux';

const DonutGraph = ({team1, team2}:any) => {
  const [userHistory, setUserHistory] = useState<any[]>([])

  const { matches } = useSelector((state: any[]) => state.userMatches);


  useEffect(() => {
    const getUserHistoy = async () => {
      let userMatches: any[] = await Promise.all(matches);
      //const userMatches = await getRecentMatches();
      
      console.log(JSON.stringify(userHistory));
      
      
      console.log(userMatches);
      
      setUserHistory(userMatches);
    }
    getUserHistoy();
  }, [matches, userHistory]);
  
  
  
  useEffect(() => {

    const the = async () => {
      const data1 = await team1;
      const data2 = await team2;
      console.log(data1, data2)
    }
    
    the();
  }, [team1, team2])

  const options = {
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
        { name: "lowest-kill-rate", y: 31 },
        { name: "highest-kill-rate", y: 40 }
      ]
    }]
  } 

  
  
  return (
    <div>
      <CanvasJSChart
        options={options}
      />
    </div>
  )
}

export default DonutGraph
