import { SimpleGrid, Center, Box, GridItem } from "@chakra-ui/react"
import { Link } from "react-router-dom";

const ScrimCard: React.FC<{scrim:any}> = ({scrim}) => {

  return (
    <Link to={`/scimmage/${scrim.id}`}>
      <Box borderRadius="2g" borderWidth="1px" m={2} width={"42vw"}>
        <Center>
          <SimpleGrid columns={3} spacing={2} m={2}>
            <Center><GridItem mg={2} p={1} borderRadius="lg" bg="#3182CE">{scrim.team1Name}</GridItem></Center>
            <Center><h3>Vs</h3></Center>
            <Center><GridItem mg={2} p={1} borderRadius="lg" bg="#E53E3E">{scrim.team2Name}</GridItem></Center>
          </SimpleGrid>
        </Center>
      </Box>
    </Link>
  );
}

export default ScrimCard