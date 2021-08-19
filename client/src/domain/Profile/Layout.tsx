import { Flex, useMediaQuery } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import UserDonutGraph from "./UserDonutGraph";
import jwt_decode from 'jwt-decode';
import { getUserInfo, getUserMatches } from "../../api/profileAPI"
import ProfileIcon from "../../components/ProfileIcon/ProfileIcon";
import ProfileMatch from "./ProfileMatch";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchRegions, fetchUserInfo, fetchUserRank } from "../../redux/slices";

interface Props {}

const Layout: React.FC<Props> = (props: Props) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.userReducer.userState);
    const userRank = useAppSelector((state) => state.userReducer.userRank);
    const regions = useAppSelector((state) => state.regionReducer.regionState);
    let regionName: any

    const [userMatches, setUserMatches] = useState<any>([]);
    const [isLargerThan] = useMediaQuery("(min-width:1050px)");

  console.log(regions);
    // regions.forEach((region: any) => {
    //   if (region.id === user.regionid) region.name = regionName
    // })

    useEffect(() => {
      dispatch(fetchUserInfo());
      dispatch(fetchRegions())
      dispatch(fetchUserRank())
    }, [dispatch]);

    console.log(userMatches);
    console.log("user: ", user)
    console.log("userRank: ", userRank)
    console.log("Regions: ", regions)

      
      
    
    
  

  //const user = useGetUsers();

  
  return (

    <Flex padding="20px" flexDirection={isLargerThan ? "row" : "column"}>
      <Flex minW="20vw" justifyContent="center" alignContent="center">
        <ProfileIcon users={user} userRank={userRank} regionName={regionName} />
      </Flex>
      <Flex minW="55vw" justifyContent="center" alignContent="center">
        {userMatches?.map((match: any) => (
          <ProfileMatch match={match} key={uuidv4()} />
        ))}
        sdfsdfsdf
      </Flex>
      <UserDonutGraph/>
    </Flex>
  );
}

export default Layout
