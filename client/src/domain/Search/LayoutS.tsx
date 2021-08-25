import {
  Flex,
  useMediaQuery,
  Menu,
  MenuButton,
  MenuList,
  Divider,
  Center,
  useColorModeValue
} from "@chakra-ui/react";
import { FiChevronDown } from "react-icons/fi";
import { useEffect, useState } from "react";
import ProfileIcon from "../../components/ProfileIcon/ProfileIcon"
import ProfileMatch from "../../domain/Profile/ProfileMatch";
import { v4 as uuidv4 } from "uuid";
import { getSummoner } from "../../api/api";
import { useLocation } from "react-router";
import  Spinners from "./Spinners";
import Graph from "../../domain/Profile/Graph";
import Roles from "../../domain/Profile/Roles";


interface Props {}

const Layout: React.FC<Props> = () => {
  const location: any = useLocation();
  let regionName = location.state?.formdata.regionId;
  const [user, setUser] = useState<any>();
  const [isLargerThan] = useMediaQuery("(max-width:1050px)");
  const [loading, setLoading] = useState<boolean>(false);
  const [isSmallerThan] = useMediaQuery("(max-width:450px)");
  const colors = useColorModeValue("#F0F8FF", "gray.900");
  const pathName = useLocation().pathname;

  const handleLoad = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  };
  console.log(user)

  useEffect(() => {
    console.log("Location update");
    getSummoner(
      location.state.formdata.summoner_name,
      location.state.formdata.regionId
    ).then((res) => setUser(res));
    handleLoad();
  }, [location?.state?.formdata?.regionId, location?.state?.formdata?.summoner_name, pathName]);

  const matches = user?.matches
  const userRank = user?.rank

  return (
    <Flex
      justifyContent="space-evenly"
      flexDirection={!isLargerThan ? "row" : "column"}
    >
      {!loading ? (
        <>
          <Flex
            h="500px"
            minW="20vw"
            justifyContent="center"
            alignContent="center"
            mb={isLargerThan ? 3 : 0}
            mr={isLargerThan ? 0 : 6}
          >
            <ProfileIcon
              users={user}
              userRank={userRank}
              regionName={regionName}
            />
          </Flex>
          <Flex minW="50vw" justifyContent="center" alignContent="center">
            <Flex
              flexDirection="column"
              w="100%"
              h="100%"
              justifyContent="center"
              alignContent="center"
            >
              <>
                {!isSmallerThan && (
                  <Flex
                    borderWidth="1px"
                    h="12vh"
                    mb={3}
                    borderRadius="10px"
                    bg={colors}
                  >
                    <Flex w="40%" justifyContent="space-between" padding="10px">
                      <Graph matches={matches} user={user} />
                    </Flex>
                    <Center>
                      <Divider orientation="vertical" height="80%" />
                    </Center>
                    <Flex w="60%">
                      <Roles matches={matches} userRank={false} user={user} />
                    </Flex>
                  </Flex>
                )}
                {matches &&
                  matches?.map(
                    (match: any) =>
                      match && (
                        <>
                          <ProfileMatch
                            match={match}
                            users={user}
                            key={uuidv4()}
                            opened={false}
                          />
                          <Flex justifyContent="flex-start">
                            <Menu isLazy>
                              <MenuButton>
                                <FiChevronDown />
                              </MenuButton>
                              <MenuList>
                                <ProfileMatch
                                  match={match}
                                  users={user}
                                  opened={true}
                                  key={uuidv4()}
                                />
                              </MenuList>
                            </Menu>
                          </Flex>
                        </>
                      )
                  )}
              </>
            </Flex>
          </Flex>
        </>
      ) : (
        <Flex w="100vw" h="60vh" alignItems="center" justifyContent="center">
          <Spinners />
        </Flex>
      )}
    </Flex>
  );
};

export default Layout;
