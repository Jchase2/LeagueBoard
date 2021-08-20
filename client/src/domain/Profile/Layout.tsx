import { Flex, useMediaQuery, Image } from "@chakra-ui/react"
import { useEffect } from "react";
import ProfileIcon from "../../components/ProfileIcon/ProfileIcon";
// import ProfileMatch from "./ProfileMatch";
// import { v4 as uuidv4 } from "uuid";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchMatches, setMatches, fetchRegions, fetchUserInfo, fetchUserRank } from "../../redux/slices";

interface Props {}

const Layout: React.FC<Props> = (props: Props) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.userReducer.userState);
    const userRank = useAppSelector((state) => state.userReducer.userRank);
    const regions = useAppSelector((state) => state.regionReducer.regionState);
    const matches = useAppSelector((state) => state.matchReducer.matchState);

    const [isLargerThan] = useMediaQuery("(min-width:1050px)");
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
    <Flex padding="20px" flexDirection={isLargerThan ? "row" : "column"}>
      <Flex minW="20vw" justifyContent="center" alignContent="center">
        <ProfileIcon users={user} userRank={userRank} regionName={regionName} />
      </Flex>
      <Flex minW="55vw" justifyContent="center" alignContent="center">
        <Flex flexDirection="column">
        {/* {userMatches?.map((match: any) => (
          <ProfileMatch match={match} key={uuidv4()} />
        ))} */}
        Matches will be here when rafel wants to make the endpoint.
        Also just realized it isnt in redux so im going to sleep
        <Image src="10.jpg" alt="coming soon" />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Layout
