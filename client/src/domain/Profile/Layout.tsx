import {
  Flex,
  useMediaQuery,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiMenu, FiChevronDown } from "react-icons/fi";
import ProfileIcon from "../../components/ProfileIcon/ProfileIcon";
import ProfileMatch from "./ProfileMatch";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Spinners from "../Search/Spinners";
import {
  fetchMatches,
  fetchRegions,
  fetchUserInfo,
  fetchUserRank,
} from "../../redux/slices";

interface Props {}

const Layout: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userReducer.userState);
  const userRank = useAppSelector((state) => state.userReducer.userRank);
  const regions = useAppSelector((state) => state.regionReducer.regionState);
  const matches = useAppSelector((state) => state.matchReducer.matchState);
  let regionName: any;
  const [isLargerThan] = useMediaQuery("(max-width:1050px)");
  if (regions) {
    regionName = regions[user?.regionid - 1]?.name;
  }
  const [loading, setLoading] = useState<boolean>(false);

  const handleLoad = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    dispatch(fetchUserInfo());
    dispatch(fetchRegions());
    dispatch(fetchMatches());
    dispatch(fetchUserRank());
    handleLoad();
  }, [dispatch]);

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
        <ProfileIcon users={user} userRank={userRank} regionName={regionName} />
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

                            <MenuList key={uuidv4()}>
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
          ) : (
            <Spinners

            />
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Layout;
