import {
  Flex,
  useMediaQuery,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import { FiMenu, FiChevronDown } from "react-icons/fi";
import { useEffect, useState } from "react";
import ProfileIcon from "../../components/ProfileIcon/ProfileIcon"
import ProfileMatch from "../../domain/Profile/ProfileMatch";
import { v4 as uuidv4 } from "uuid";
import { getSummoner } from "../../api/api";
import { useLocation } from "react-router";
import  Spinners from "./Spinners";


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
    }, 4000);
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
                <Flex borderWidth="1px"></Flex>
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
