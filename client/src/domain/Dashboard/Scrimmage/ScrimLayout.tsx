
import { Box, Divider, Container, SimpleGrid, Flex, Center} from "@chakra-ui/react";
import PredictionsGraph from './Graphs/PredictionsGraph';

import { ScrimmageTable } from './ScrimmageTable';
import ParticipationGraph from './Graphs/ParticipationGraph';



export const ScrimLayout = () => {

  return (
    <div>

      <Center>
        <Flex>
          <Box>
            <ScrimmageTable />
          </Box>
        </Flex>
      </Center>

      <Divider orientation="horizontal"/>
      
      <Center>
        <Container>
          <PredictionsGraph />
        </Container>
      </Center>

      <Center>
        <Container>
          <ParticipationGraph/>
        </Container>
      </Center>
  
     
    </div>
  );
}
