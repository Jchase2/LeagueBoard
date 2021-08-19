import { Flex } from "@chakra-ui/react"
import { useEffect, useState } from "react";
// import useGetUsers from "../../utils/Getuser"

interface Props {}

const Layout: React.FC<Props> = (props: Props) => {
  // use custom react hook, import use User hook, deconstruct outside
  // dont decode here, decode tokens in the backend, gets the user ID and get information attach to the header of the request
  // let decoded: any;
  // const user: string | null = localStorage.getItem("accessToken");
  // if (user) {
  //   decoded = jwt_decode(user);
  // }
  // if (decoded) {
  //   getUserMatches(decoded?.user?.puuid).then((res) => setuserMatches(res));
  // }
  // console.log(userMatches);
  // console.log(decoded)
  // const user = useGetUsers();
  // console.log(user)
  return (
    <Flex justifyContent="center" alignContent="center">
      Hello world
    </Flex>
  );
}

export default Layout
