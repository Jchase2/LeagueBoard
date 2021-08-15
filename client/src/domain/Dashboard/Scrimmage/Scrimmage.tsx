import React from 'react'
import { MockScrimmage } from './mockdata'
import { IScrimmage } from './MockInterface'
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, 
  Container, SimpleGrid} from "@chakra-ui/react"


export const Scrimmage = (MockScrimmage:IScrimmage) => {
  const data = MockScrimmage;
  const team1 = data.teams.team1;
  const team2 = data.teams.team2;

  return (
    <div>
      <Container>
      <SimpleGrid columns={2} spacing={2}>
      <Table variant="striped" colorScheme="teal">
          <TableCaption>{data.date} {data.time}</TableCaption>
          {
            
            <Tbody>
            <Tr>
              <Td>inches</Td>
              <Td>millimetres (mm)</Td>
              <Td isNumeric>25.4</Td>
            </Tr>
          </Tbody>
          }
          

        </Table>
        <Table variant="striped" colorScheme="teal">
          <TableCaption></TableCaption>

          <Tbody>
            <Tr>
              <Td>inches</Td>
              <Td>millimetres (mm)</Td>
              <Td isNumeric>25.4</Td>
            </Tr>
          </Tbody>

        </Table>
      </SimpleGrid>
        
      </Container>
    
    </div>
  );
}
