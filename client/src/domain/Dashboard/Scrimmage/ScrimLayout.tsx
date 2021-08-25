import { Box, Divider, Container, Center, } from "@chakra-ui/react";
import PredictionsGraph from './Graphs/PredictionsGraph';
import { useParams } from "react-router-dom";
import { ScrimmageTable } from './ScrimmageTable';
import { fetchScrimmageById } from '../../../redux/slices/scrimmageSlice';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { useEffect, useState } from "react";

const ScrimLayout: React.FC = () => {
  const [teamOne, setTeamOne] = useState<any>([])
  const [teamTwo, setTeamTwo] = useState<any>([])
  const id = useParams<urlParams>();
  const dispatch = useAppDispatch()
  const scrim:any = useAppSelector((state) => state.scrimmageSlice.scrimmages);

  useEffect(() => {
    dispatch(fetchScrimmageById(Number(id.id)));
  }, [dispatch, id?.id]);

  type urlParams = {
    id: string;
  };

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
          <Box>
            <ScrimmageTable scrim={scrim}/>
          </Box>
      </Center>

      <Divider orientation="horizontal" />

      <Center>
        <Container>
          <PredictionsGraph scrimm={scrim}/>
        </Container>
      </Center>
    </div>
  );
}

export default ScrimLayout;