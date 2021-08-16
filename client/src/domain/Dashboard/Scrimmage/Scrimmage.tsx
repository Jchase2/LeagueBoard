import React, { useState } from 'react'
import mockScrimmage from './mockdata'
import { IScrimmage } from './MockInterface'
import { Table, Thead, Tbody, Tr, Td, TableCaption, 
  Container, SimpleGrid} from "@chakra-ui/react"


export const Scrimmage = () => {
  const [data, dataSet] = useState(mockScrimmage)
  const team1 = data?.teams.team1;
  const team2 = data?.teams.team2;

  
  
  
  return (
    data ?
    <div>
      <Container>
      <SimpleGrid columns={2} spacing={2}>
      <Table className="team1Table" variant="striped" colorScheme="teal">
          <TableCaption>{data.date} {data.time}</TableCaption>
          {
          team1?.players.forEach(element => {
            <Tbody >
              <Tr key={element.name}>
                 <Td>{element.name}</Td>
                 <Td>{element.level}</Td>
                 <Td>{element.rank}</Td>
              </Tr>
           </Tbody>
          })
          }
        </Table>

        <Table className="team2Table" variant="striped" colorScheme="teal">
          <TableCaption></TableCaption>

          {
          team2?.players.forEach(element => {
            <Tbody className="team2Table">
              <Tr key={element.name}>
                 <Td>{element.name}</Td>
                 <Td>{element.level}</Td>
                 <Td>{element.rank}</Td>
              </Tr>
           </Tbody>
          })
          }

        </Table>
      </SimpleGrid>
        
      </Container>
    
    </div>
    : null
  );
}
