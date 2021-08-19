import { Flex } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { getUserInfo, getUserMatches } from "../../api/profileAPI"

interface Props {}

const Layout: React.FC<Props> = (props: Props) => {
    const [user, setUser] = useState<any>();
    const [userMatches, setUserMatches] = useState<any>([]);

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
    <Flex justifyContent="center" alignContent="center">
      dsfsdfsf
    </Flex>
  );
}

export default Layout
