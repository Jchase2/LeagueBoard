import { useState, useEffect } from 'react';
import { Heading, Table, Tfoot, Thead, Tbody, Th, Tr, Td,  SimpleGrid, Center} from "@chakra-ui/react";

export const ScrimmageTable = ({scrim}:any) => {
  const [teamOne, setTeamOne] = useState<any>([])
  const [teamTwo, setTeamTwo] = useState<any>([])


  useEffect(() => {
    if (scrim.player1info) {
      const newTeamOne: any[] = []
      const newTeamTwo: any[] = []
      for (let i = 1; i <= 10; i++) {
        const rankedInfo = scrim[`player${i}ranked`].map(info => {
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
          name: scrim[`player${i}`],
          info: scrim[`player${i}info`],
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
  }, [scrim])



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
        <Center><Thead><Tr><Th>{scrim.team1}</Th></Tr></Thead></Center>

        <Tbody className="team1Table">
          { teamOne.map(element => (
              <Tr key={element.name}>
                <Td>{element.name}</Td>
                <Td>{element.level}</Td>
                <Td>{element.rank}</Td>
              </Tr>
          )) }
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
        <Center><Thead><Tr><Th>{scrim.team2}</Th></Tr></Thead></Center>

          <Tbody className="team2Table">
            {teamTwo.map(element => (
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
    </div>
  );
}
