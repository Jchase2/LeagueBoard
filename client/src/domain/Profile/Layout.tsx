import { Flex, useMediaQuery, Image } from "@chakra-ui/react"
import { useEffect } from "react";
import ProfileIcon from "../../components/ProfileIcon/ProfileIcon";
import ProfileMatch from "./ProfileMatch";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchMatches, setMatches, fetchRegions, fetchUserInfo, fetchUserRank } from "../../redux/slices";

interface Props {}

const Layout: React.FC<Props> = (props: Props) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.userReducer.userState);
    const userRank = useAppSelector((state) => state.userReducer.userRank);
    const regions = useAppSelector((state) => state.regionReducer.regionState);
    const matches = useAppSelector((state) => state.matchReducer.matchState);

    const [isLargerThan] = useMediaQuery("(max-width:1050px)");

    const [isSmallerThan] = useMediaQuery("(max-width:2248px)");
    const regionName = regions[user?.regionid - 1]?.name
    
    useEffect(() => {
      dispatch(fetchUserInfo());
      dispatch(fetchRegions())
      dispatch(setMatches())
      dispatch(fetchMatches())
      dispatch(fetchUserRank())
    }, [dispatch]);

    console.log("user: ", user)
    console.log("userRank: ", userRank)
    console.log("Regions: ", regions)
    console.log("Matches: ", matches)

  return (
    <Flex flexDirection={!isLargerThan ? "row" : "column"}>
      <Flex
        maxH={isLargerThan ? "80vh" : "47vh"}
        minW="20vw"
        justifyContent="center"
        alignContent="center"
        mb={isLargerThan ? 3 : 0}
        mr={isLargerThan ? 0 : 6}
      >
        <ProfileIcon users={user} userRank={userRank} regionName={regionName} />
      </Flex>
      <Flex minW="60vw" justifyContent="center" alignContent="center">
        <Flex
          flexDirection="column"
          w="100%"
          justifyContent="center"
          alignContent="center"
        >
          {matches &&
            matches?.map((match: any) => (
              <ProfileMatch match={match} users={user} key={uuidv4()} />
            ))}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Layout
