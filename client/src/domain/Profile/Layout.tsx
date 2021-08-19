import { Flex } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import UserDonutGraph from "./UserDonutGraph";
import jwt_decode from 'jwt-decode';
import { getUserMatches } from '../../api/profileAPI';

interface Props {}

const Layout: React.FC<Props> = (props: Props) => {
  // use custom react hook, import use User hook, deconstruct outside
  // dont decode here, decode tokens in the backend, gets the user ID and get information attach to the header of the request
  const [current, setCurrent] = useState<any>()
  const [userMatches, setUserMatches] = useState()
  let decoded: any;
  const user:any = localStorage.getItem("accessToken");
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
    <Flex justifyContent="center" alignContent="center">
      Hello world
      
    </Flex>
  );
}

export default Layout
