import { Flex, Spinner, useMediaQuery } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ProfileIconS from "./PlayerIconS";
import ProfileMatch from "../../domain/Profile/ProfileMatch";
import { v4 as uuidv4 } from "uuid";
import { getSummoner } from "../../api/api";
import { useLocation } from "react-router";


interface Props {}

const Layout: React.FC<Props> = () => {
  const location: any = useLocation();
  let regionName = location.state?.formdata.regionId;
  const [user, setUser] = useState<any>();
  const [isLargerThan] = useMediaQuery("(max-width:1050px)");
  const [loading, setLoading] = useState<boolean>(false);
  const pathName = useLocation().pathname;

  const handleLoad = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  };

  useEffect(() => {
    console.log("Location update");
    getSummoner(
      location.state.formdata.summoner_name,
      location.state.formdata.regionId
    ).then((res) => setUser(res));
    handleLoad();
  }, [pathName]);

  const matches = user?.matches
  const userRank = user?.rank[0]

  return (
    <Flex
      justifyContent="space-evenly"
      flexDirection={!isLargerThan ? "row" : "column"}
    >
      <Flex
        h="500px"
        minW="20vw"
        justifyContent="center"
        alignContent="center"
        mb={isLargerThan ? 3 : 0}
        mr={isLargerThan ? 0 : 6}
      >
        <ProfileIconS users={user} userRank={userRank} regionName={regionName} />
      </Flex>
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
              <Flex borderWidth="1px"></Flex>
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
  );
};

export default Layout;
