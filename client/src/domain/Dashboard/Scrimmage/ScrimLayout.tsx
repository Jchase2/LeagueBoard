import { Box, Divider, Container, Center, } from "@chakra-ui/react";
import PredictionsGraph from './Graphs/PredictionsGraph';
import { useParams } from "react-router-dom";
import { ScrimmageTable } from './ScrimmageTable';
import { fetchScrimmageById } from '../../../redux/slices/scrimmageSlice';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { useEffect, useState } from "react";
import './layoutStyles.css';

const ScrimLayout: React.FC = () => {
  const [scrim, setScrim] = useState<any>({})
  const [loading, setLoading] = useState<boolean>(false)
  const id = useParams<urlParams>();
  const dispatch = useAppDispatch()
  const scrimm:any = useAppSelector((state) => state.scrimmageSlice.scrimmages);

  useEffect(() => {
    dispatch(fetchScrimmageById(Number(id.id)));
  }, [dispatch, id?.id]);

  type urlParams = {
    id: string;
  };

  useEffect(() => {
    let app:any[] = [];
    app.push(Object.values(scrimm));
    console.log(app)
    if (app[0].length === 48) {
      setScrim(scrimm);
      setLoading(true);
    }
  }, [scrimm, loading])



  return (
    <>
      {loading === false ? (
        <Center>
          <Box>
            <img className="img" src="https://tenor.com/view/league-of-legends-ahri-aburrido-gif-5315136.gif"
              alt="pixel princess with sword"
            />
          </Box>
        </Center>
      ) : (
        <div>
          <Center>
            <Box>
              <ScrimmageTable scrim={scrim} />
            </Box>
          </Center>

          <Divider orientation="horizontal" />

          <Center>
            <Container>
              <PredictionsGraph scrim={scrim} />
            </Container>
          </Center>
        </div>
      )}
  </>
  );
}

export default ScrimLayout;