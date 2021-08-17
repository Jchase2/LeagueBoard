import { Flex } from "@chakra-ui/react"
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import { getUserMatches } from "../../api/profileAPI"

interface Props {}

const Layout = (props: Props) => {
    let decoded: any
    const user: string | null = localStorage.getItem("accessToken");
    if (user) {
      decoded = jwt_decode(user);
    }
    const [userMatches, setuserMatches] = useState([])
    useEffect(() => {
        getUserMatches(decoded?.user?.puuid).then((res) => setuserMatches(res));
    }, [])
    console.log(userMatches);
    return <Flex justifyContent="center" alignContent="center">
        Hello world
    </Flex>;
}

export default Layout
