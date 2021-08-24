import { useState, useEffect } from 'react';
import { Heading, Table, Tfoot, Thead, Tbody, Th, Tr, Td,  SimpleGrid, Center} from "@chakra-ui/react";
import { IScrimmage } from '../../../interfaces/Scrimmages';

export const ScrimmageTable: React.FC<{scrim:any}> = ({scrim}) => {
  const [teamOne, setTeamOne] = useState<any>([])
  const [teamTwo, setTeamTwo] = useState<any>([])
  //USE THIS ONE TO FETCH A SCRIMMAGE
  //fetchScrimmageById
  let data = scrim;  
  let player:any[] = [];
  let team1:any = [];
  let team2:any = [];
  
  useEffect(() => {
    if (data.player1info) {
      const newTeamOne: any[] = []
      const newTeamTwo: any[] = []
      for (let i = 1; i <= 10; i++) {
        const rankedInfo = data[`player${i}ranked`].map(info => {
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
          name: data[`player${i}`],
          info: data[`player${i}info`],
          ranked: rankedInfo.length ? rankedInfo[0] : undefined
        }

        if (i <= 5) {
          newTeamOne.push(player)
        } else {
          newTeamTwo.push(player)
        }
      }
      setTeamOne(newTeamOne);
      setTeamTwo(newTeamTwo);
    }
  }, [data])

  

  return (
    <div>
      <Center>
      
        <Heading as="h4" size="md">
         Battle Date: {scrim?.date}  at  {scrim?.time} 
        </Heading>

      </Center>
       
       {console.log(teamOne, teamTwo)}
      <SimpleGrid columns={2} spacing={2}>
        
        <Table className="team1Table" variant="striped" colorScheme="blue">
        <Center><Thead><Tr><Th>{scrim.team1Name}</Th></Tr></Thead></Center>
          
        <Tbody className="team1Table">
          {/* {player1.map(element => (
              <Tr key={element.name}>
                <Td>{element.name}</Td>
                <Td>{element.level}</Td>
                <Td>{element.rank}</Td>
              </Tr>
          ))} */}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>Player Name</Th>
            <Th>level</Th>
            <Th>rank</Th>
          </Tr>
        </Tfoot>
        </Table>
      
        <Table className="team2Table" variant="striped" colorScheme="red">
        <Center><Thead><Tr><Th>{scrim.team2Name}</Th></Tr></Thead></Center>

          <Tbody className="team2Table">  
            {/* {player2.map(element => (
              <Tr key={element.name}>
                <Td>{element.name}</Td>
                <Td>{element.level}</Td>
                <Td>{element.rank}</Td>
              </Tr>
            ))} */}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Player Name</Th>
              <Th>level</Th>
              <Th>rank</Th>
            </Tr>
          </Tfoot>
        </Table>
       
      </SimpleGrid>  
    </div>
  );
}