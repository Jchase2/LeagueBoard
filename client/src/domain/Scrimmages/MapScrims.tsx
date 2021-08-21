import { Container, LinkBox, LinkOverlay, SimpleGrid, Center } from "@chakra-ui/react"
import { IScrimmage } from "../../interfaces/Scrimmages";

const MapScrims: React.FC<{scrims:IScrimmage[]}> = ({scrims}) => {
  return (
    <>
      {
      scrims && [...scrims].sort((a, b) => Number(b.date) - Number(a.date)).map((scrim) => (
        <LinkBox>
          
            <LinkOverlay>
              <SimpleGrid columns={3} spacing={2}>
                <Center>
                  <Container>{scrim.team1Name}</Container>
                  <Container><h3>Vs</h3></Container>
                  <Container>{scrim.team2Name}</Container>
                </Center>
              </SimpleGrid>
            </LinkOverlay>
          
        </LinkBox> 
      ))
      }
    </>
  );
};

export default MapScrims;
