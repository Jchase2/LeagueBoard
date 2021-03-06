import {
  IconButton,
  Avatar,
  Box,
  Flex,
  HStack,
  VStack,
  useColorMode,
  useColorModeValue,
  Link,
  Text,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useMediaQuery
} from "@chakra-ui/react";
import { FiMenu, FiChevronDown } from "react-icons/fi";
import { FaMoon, FaSun } from "react-icons/fa";
import Searchbar from "../Searchbar/Searchbar";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchRegions, fetchUserInfo } from "../../redux/slices";
import NewPosts from "./NewPosts";

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const [isLargerThan] = useMediaQuery("(max-width:400px)");
  let regionName: any
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userReducer.userState);
  const regions = useAppSelector((state) => state.regionReducer.regionState);
  if (regions) { regionName = regions[user?.regionid - 1]?.name }

   useEffect(() => {
     dispatch(fetchUserInfo());
     dispatch(fetchRegions());
   }, [dispatch]);

  const { toggleColorMode } = useColorMode();
  const colors = useColorModeValue("grey.200", "grey.700");
  const SwitchIcon = useColorModeValue(FaSun, FaMoon);
  return (
    <>
      <Flex
        ml={{ base: 0, md: 60 }}
        px={{ base: 4, md: 4 }}
        height="20"
        padding="1px"
        alignItems="center"
        bg={useColorModeValue("grey.900", "gray.900")}
        borderBottomWidth="1px"
        borderBottomColor={useColorModeValue("gray.200", "gray.700")}
        justifyContent="space-between"
        {...rest}
      >
        <IconButton
          display={{ base: "flex", md: "none" }}
          onClick={onOpen}
          variant="ghost"
          aria-label="open menu"
          icon={<FiMenu />}
        />
        <Searchbar message={"Search for Summoners"} regions={regions} />
        <HStack spacing={{ base: "0", md: "6" }}>
          <NewPosts />
          <IconButton
            icon={<SwitchIcon />}
            size="md"
            aria-label="color Toggle"
            variant="ghost"
            fontSize="lg"
            onClick={toggleColorMode}
            color={colors}
          />
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: "none" }}
              >
                <>
                  <HStack>
                    <Avatar
                      size={isLargerThan ? "sm" : "md"}
                      src={
                        user
                          ? `http://ddragon.leagueoflegends.com/cdn/11.16.1/img/profileicon/${user?.iconid}.png`
                          : ""
                      }
                    />
                    <VStack
                      display={{ base: "none", md: "flex" }}
                      alignItems="flex-start"
                      spacing="1px"
                      ml="2"
                    >
                      <Text fontSize="md">
                        {user ? `${user?.summoner_name}` : ""}
                      </Text>
                      <Text fontSize="xs">{regionName}</Text>
                    </VStack>
                    <Box display={{ base: "none", md: "flex" }}>
                      <FiChevronDown />
                    </Box>
                  </HStack>
                </>
              </MenuButton>
              <MenuList
                bg={useColorModeValue("#F0F8FF", "gray.900")}
                borderColor={useColorModeValue("gray.200", "gray.700")}
              >
                <Link href="/">
                  <MenuItem>Profile</MenuItem>
                </Link>
                <MenuDivider />
                <Link href={user ? "/" : "/signin"}>
                  <MenuItem
                    onClick={() => localStorage.removeItem("accessToken")}
                  >
                    {user ? "Sign Out" : "Sign In"}
                  </MenuItem>
                </Link>
              </MenuList>
            </Menu>
          </Flex>
        </HStack>
      </Flex>
    </>
  );
};

export default MobileNav;
