import { useState, useEffect } from 'react';
import { Heading, Table, Tfoot, Tbody, Th, Tr, Td,  SimpleGrid, Center, Divider} from "@chakra-ui/react";

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
      {console.log(teamOne, teamTwo, scrim)}
      <Center>
      <SimpleGrid columns={3} spacing={2}>
        <Heading as="h4" size="md">{scrim.team1}</Heading>
        <Center><Heading as="h4" size="md">vs</Heading></Center>
        <Heading as="h4" size="md">{scrim.team2}</Heading>
      </SimpleGrid>
      </Center>
      <Divider></Divider>
      <SimpleGrid columns={2} spacing={2}>
        <Center>
          <h3>Battle Day: {scrim?.date}</h3>
        </Center>
        <Center>
          <h3>Time: {scrim?.time} </h3>
        </Center>
        <Table className="team1Table" variant="striped" colorScheme="blue">
          <Tbody className="team1Table">
            {teamOne.map((element) => (
              <Tr key={element.name}>
                <Td>{element.name}</Td>
                <Td>{element.info.summonerLevel}</Td>
                <Td>{element.ranked ? element.ranked.rank : "not ranked"}</Td>
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
          <Tbody className="team2Table">
            {teamTwo.map((element) => (
              <Tr key={element.name}>
                <Td>{element.name}</Td>
                <Td>{element.info.summonerLevel}</Td>
                <Td>{element.ranked ? element.ranked.rank : "not ranked"}</Td>
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
