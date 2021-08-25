import React, {useEffect, useState} from 'react'
import { CanvasJSChart } from 'canvasjs-react-charts';
//import { getRecentMatches } from '../../../../api/backendApi';

const LineGraph = ({team1, team2}:any) => {
  const [userHistory, ] = useState<any[]>([])




  useEffect(() => {
    const getUserHistoy = async () => {

      //const userMatches = await getRecentMatches();

      console.log(JSON.stringify(userHistory));



      //let user = await Promise.all(getRecentMatches);

      //console.log(JSON.stringify(user));

    }
    getUserHistoy();



  }, [userHistory]);



  useEffect(() => {

    const the = async () => {
      const data1 = await team1;
      const data2 = await team2;
      console.log(data1, data2)
    }

    the();
  }, [team1, team2])

  const options  = {
    animationEnabled: true,
    title:{
      text: "Monthly Sales - 2017"
    },
    axisX: {
      valueFormatString: "MMM"
    },
    axisY: {
      title: "Sales (in USD)",
      prefix: "$"
    },
    data: [{
      yValueFormatString: "$#,###",
      xValueFormatString: "MMMM",
      type: "spline",
      name: "kills",
      dataPoints: [
        { x: new Date(2017, 0), y: 25060 },
        { x: new Date(2017, 1), y: 27980 },
        { x: new Date(2017, 2), y: 42800 },
        { x: new Date(2017, 3), y: 32400 },
        { x: new Date(2017, 4), y: 35260 },
        { x: new Date(2017, 5), y: 33900 },
        { x: new Date(2017, 6), y: 40000 },
        { x: new Date(2017, 7), y: 52500 },
        { x: new Date(2017, 8), y: 32300 },
        { x: new Date(2017, 9), y: 42000 },
        { x: new Date(2017, 10), y: 37160 },
        { x: new Date(2017, 11), y: 38400 }
      ]
    },{
      yValueFormatString: "$#,###",
      xValueFormatString: "MMMM",
      type: "spline",
      name: "deaths",
      dataPoints: [
        { x: new Date(2017, 0), y: 25060 },
        { x: new Date(2017, 1), y: 27980 },
        { x: new Date(2017, 2), y: 42800 },
        { x: new Date(2017, 3), y: 32400 },
        { x: new Date(2017, 4), y: 35260 },
        { x: new Date(2017, 5), y: 33900 },
        { x: new Date(2017, 6), y: 40000 },
        { x: new Date(2017, 7), y: 52500 },
        { x: new Date(2017, 8), y: 32300 },
        { x: new Date(2017, 9), y: 42000 },
        { x: new Date(2017, 10), y: 37160 },
        { x: new Date(2017, 11), y: 38400 }
      ]
    },
    ]
  }



  return (
    <div>
      <CanvasJSChart
        options={options}
      />
    </div>
  )
}

export default LineGraph