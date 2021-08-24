import { useState, useEffect } from 'react';
import { Heading, Table, Tfoot, Thead, Tbody, Th, Tr, Td,  SimpleGrid, Center} from "@chakra-ui/react";
import { IScrimmage } from '../../../interfaces/Scrimmages';

export const ScrimmageTable: React.FC<{scrim:any}> = ({scrim}) => {
  const [teamOne, setTeamOne] = useState<any>([])
  const [teamTwo, setTeamTwo] = useState<any>([])
  //USE THIS ONE TO FETCH A SCRIMMAGE
  //fetchScrimmageById
  let data = scrim;  

  useEffect(() => {
    let team1:any = [];
    let team2:any = [];
    for (let [key, value] of Object?.entries(data)) {
      if (key === 'player1' || key === 'player2' || key === 'player3' || key === 'player4'  || key === 'player5') {
        team1.push(value);
      }
       if (key === 'player6' || key === 'player7' || key === 'player8'  || key === 'player9'  || key === 'player10') {
        team2.push(value);
      } 
    }
    
    
    /* const sortedPlayers1 = team10.players.sort(function (a, b) {
      return b.level - a.level;
    });
    const sortedPlayers2 = team20.players.sort(function (a, b) {
      return b.level - a.level;
    }); */
    
    
  }, [data])
  
  
  return (
    <div>
      <Center>
      
        <Heading as="h4" size="md">
         Battle Date: {scrim?.date}  at  {scrim?.time} 
        </Heading>

      </Center>
       
       
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
