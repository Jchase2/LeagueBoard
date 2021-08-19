import { Flex, useMediaQuery, Box } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { getUserInfo, getUserMatches, getUserRank } from "../../api/profileAPI"
import ProfileIcon from "../../components/ProfileIcon/ProfileIcon";
import ProfileMatch from "./ProfileMatch";
import { v4 as uuidv4 } from "uuid";

interface Props {}

const Layout: React.FC<Props> = (props: Props) => {
    const [user, setUser] = useState<any>();
    const [userMatches, setUserMatches] = useState<any>([]);
    const [userRank, setUserRank] = useState<any>([])
    const [isLargerThan] = useMediaQuery("(min-width:1050px)");

    useEffect(() => {
      localStorage.getItem("accessToken") &&
        getUserInfo().then((res:any) => setUser(res));
    }, []);

      //user && getUserMatches(user.puuid).then(res => setUserMatches(res));

  useEffect(() => {
    getUserRank().then((res) => setUserRank(res));
  }, [])
    console.log(userMatches);
    console.log(user)
    console.log(userRank)
  // use custom react hook, import use User hook, deconstruct outside
  // dont decode here, decode tokens in the backend, gets the user ID and get information attach to the header of the request
  // let decoded: any;
  // const user: string | null = localStorage.getItem("accessToken");
  // if (user) {
  //   decoded = jwt_decode(user);
  // }
  // console.log(userMatches);
  // console.log(decoded)
  // const user = useGetUsers();
  // console.log(user)
  return (
    <Flex padding="20px" flexDirection={isLargerThan ? "row" : "column"}>
      <Flex minW="20vw" justifyContent="center" alignContent="center">
        <ProfileIcon users={user} />
      </Flex>
      <Flex minW="55vw" justifyContent="center" alignContent="center">
        
        {userMatches?.map((match:any)=> (
          <ProfileMatch 
            match={match}
            key={uuidv4()}
          />
        ))}
        sdfsdfsdf
      </Flex>
    </Flex>
  );
}

export default Layout
