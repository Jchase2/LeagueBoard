import React, { useState, useEffect } from 'react';
import mockScrimmage from './mockdata';
import { IPlayer } from './MockInterface';
import { Table, Tfoot, Thead, Tbody, Th, Tr, Td, TableCaption,
  Container, SimpleGrid} from "@chakra-ui/react";
import PredictionsGraph from './Graphs/PredictionsGraph';
import DonutGraph from './Graphs/DonutGraph';

export const Scrimmage = () => {
  const [data, dataSet] = useState(mockScrimmage)
  const team10 = data.teams.team1;
  const team20 = data.teams.team2;
  const [player1, player1Set] = useState<IPlayer[]>([])
  const [player2, player2Set] = useState<IPlayer[]>([])


  useEffect(() => {
    const sortedPlayers1 = team10.players.sort(function (a, b) {
      return b.level - a.level;
    });
    const sortedPlayers2 = team20.players.sort(function (a, b) {
      return b.level - a.level;
    });
    player1Set(sortedPlayers1);
    player2Set(sortedPlayers2);
  }, [])


  return (


    <div>


      <SimpleGrid columns={2} spacing={2}>

        <Table className="team1Table" variant="striped" colorScheme="blue">
        <Thead><Tr><Th>{team10.teamName}</Th></Tr></Thead>

        <Tbody className="team1Table">
          {player1.map(element => (
              <Tr key={element.name}>
                <Td>{element.name}</Td>
                <Td>{element.level}</Td>
                <Td>{element.rank}</Td>
              </Tr>
          ))}
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
          <Thead>
            <Tr><Th>{team20.teamName}</Th></Tr>
          </Thead>

          <Tbody className="team2Table">
            {player2.map(element => (
              <Tr key={element.name}>
                <Td>{element.name}</Td>
                <Td>{element.level}</Td>
                <Td>{element.rank}</Td>
              </Tr>
            ))}
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

      <SimpleGrid columns={2} spacing={1}>


        <DonutGraph team1={player1Set} team2={player2Set}/>

        <PredictionsGraph team1={player1Set} team2={player2Set}/>


      </SimpleGrid>

    </div>
  );
}
