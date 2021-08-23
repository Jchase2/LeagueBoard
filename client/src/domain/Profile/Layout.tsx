import { Flex, useMediaQuery, Image, SimpleGrid, Center, Spinner, Box } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import ProfileIcon from "../../components/ProfileIcon/ProfileIcon";
import UserDonutGraph from "./UserDonutGraph";
import ProfileMatch from "./ProfileMatch";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchMatches, setMatches, fetchRegions, fetchUserInfo, fetchUserRank } from "../../redux/slices";
import ParticipationGraph from './ParticipationGraph';


interface Props {}

const Layout: React.FC<Props> = (props: Props) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.userReducer.userState);
    const userRank = useAppSelector((state) => state.userReducer.userRank);
    const regions = useAppSelector((state) => state.regionReducer.regionState);
    const matches = useAppSelector((state) => state.matchReducer.matchState);
    let regionName: any
    const [isLargerThan] = useMediaQuery("(max-width:1050px)");
    if(regions) { regionName = regions[user?.regionid - 1]?.name; }
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
      dispatch(fetchUserInfo());
      dispatch(fetchRegions());
      dispatch(fetchMatches());
      dispatch(fetchUserRank());
    }, [dispatch]);

    const handleLoad = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1200);
    };
    
  //const user = useGetUsers();

  
  return (
    <>
    <Flex justifyContent="space-evenly" flexDirection={!isLargerThan ? "row" : "column"}>
      <Box>
        <Flex
          h="500px"
          minW="20vw"
          justifyContent="center"
          alignContent="center"
          mb={isLargerThan ? 3 : 0}
          mr={isLargerThan ? 0 : 6}
        >
      
          <ProfileIcon
            users={user}
            userRank={userRank}
            regionName={regionName}
          />
        </Flex>
        <br></br>  
        <SimpleGrid columns={2} spacing={2}>
          <Box>
            <UserDonutGraph/>
          </Box>
          <ParticipationGraph/>

          
 
        </SimpleGrid>

      </Box>
      

      <Flex minW="50vw" justifyContent="center" alignContent="center">
        <Flex
          flexDirection="column"
          w="100%"
          h="100%"
          justifyContent="center"
          alignContent="center"
        >
          {!loading ? (
            <>
              {matches &&
                matches?.map(
                  (match: any) =>
                    match && (
                      <ProfileMatch match={match} users={user} key={uuidv4()} />
                    )
                )}
            </>
          ) : (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          )}
        </Flex>
      </Flex>
    </Flex>
       
       
        
    </>
  );
}

export default Layout
