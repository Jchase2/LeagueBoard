import { Container, LinkBox, LinkOverlay, SimpleGrid, Center, Box } from "@chakra-ui/react"
import { Link } from "react-router-dom";

interface Props {
  
}

const ScrimCard: React.FC<{scrim:any}> = ({scrim}) => {
  return (
    <Link to={`/scimmage/${scrim.id}`}>
      <Box>
        <Center>
          <SimpleGrid columns={3} spacing={2}>
            <Center><Container>{scrim.team1Name}</Container></Center>
            <Center><h3>Vs</h3></Center>
            <Center><Container>{scrim.team2Name}</Container></Center>
          </SimpleGrid>
        </Center>
      </Box>
    </Link>
  );
}

export default ScrimCard