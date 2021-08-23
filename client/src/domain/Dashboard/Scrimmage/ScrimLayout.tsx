import { Box, Divider, Container, Flex, Center} from "@chakra-ui/react";
import PredictionsGraph from './Graphs/PredictionsGraph';
import { useParams } from "react-router-dom";
import { ScrimmageTable } from './ScrimmageTable';
import { fetchScrimmageById } from '../../../redux/slices/scrimmageSlice';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { useEffect } from "react";

const ScrimLayout: React.FC = () => {
  const { id } = useParams<urlParams>();
  const dispatch = useAppDispatch()
  const scrim:any = useAppSelector((state) => state.scrimmageSlice.scrimmages);

  useEffect(() => {

    dispatch(fetchScrimmageById(Number(id)));
  }, []);
 

  type urlParams = {
    id: string;
  };

  return (
    <div>
      <Center>
        <Flex>
          <Box>
            <ScrimmageTable />
          </Box>
        </Flex>
      </Center>

      <Divider orientation="horizontal" />

      <Center>
        <Container>
          <PredictionsGraph />
        </Container>
      </Center>
    </div>
  );
}

export default ScrimLayout;