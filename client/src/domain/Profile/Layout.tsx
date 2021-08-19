import { Flex, useMediaQuery } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import UserDonutGraph from "./UserDonutGraph";
import jwt_decode from 'jwt-decode';
import { getUserInfo, getUserMatches } from "../../api/profileAPI"
import ProfileIcon from "../../components/ProfileIcon/ProfileIcon";
import ProfileMatch from "./ProfileMatch";
import { v4 as uuidv4 } from "uuid";

interface Props {}

const Layout: React.FC<Props> = (props: Props) => {
    const [user, setUser] = useState<any>();
    const [userMatches, setUserMatches] = useState<any>([]);
    const [isLargerThan] = useMediaQuery("(min-width:765px)");

    useEffect(() => {
      localStorage.getItem("accessToken") &&
        getUserInfo().then((res:any) => setUser(res));
    }, []);
    
    if (user) {
      getUserMatches(user.puuid).then((res) => setUserMatches(res));
    }

    console.log(userMatches);
    console.log(user)
  // use custom react hook, import use User hook, deconstruct outside
  // dont decode here, decode tokens in the backend, gets the user ID and get information attach to the header of the request
  const [current, setCurrent] = useState<any>()
  //const [userMatches, setUserMatches] = useState()
  let decoded: any;
 
  useEffect(() => {
    if (user) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      decoded = jwt_decode(user);
      setCurrent(decoded);

      console.log(current);
      
    }
    if (decoded) {
      getUserMatches(current?.puuid).then((res) => setUserMatches(res));
      console.log(userMatches)
    }
  }, [])
  

  //const user = useGetUsers();

  
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
        dsnjfjksdnfbkjs
      </Flex>
    </Flex>
  );
}

export default Layout
