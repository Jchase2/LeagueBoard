import { Container, SimpleGrid, Center, Box, extendTheme, GridItem} from "@chakra-ui/react"
import { Link } from "react-router-dom";

const ScrimCard: React.FC<{scrim:any}> = ({scrim}) => {
  
  return (
    <Link to={`/scimmage/${scrim.id}`}>
      <Box>
        <Center>
          
          <SimpleGrid columns={3} spacing={2}>
            <Center><GridItem bg="#3182CE">{scrim.team1Name}</GridItem></Center>
            <Center><h3>Vs</h3></Center>
            <Center><GridItem bg="#E53E3E">{scrim.team2Name}</GridItem></Center>
          </SimpleGrid>
          
        </Center>
      </Box>
    </Link>
  );
}

export default ScrimCard