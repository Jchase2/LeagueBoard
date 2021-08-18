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
} from "@chakra-ui/react";
import { FiMenu, FiBell, FiChevronDown } from "react-icons/fi";
import { FaMoon, FaSun } from "react-icons/fa";
import Searchbar from "../Searchbar/Searchbar";
import { Regions } from "../../interfaces/Regions";
import { getRegions } from "../../api/api";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  //useMemo in react, only recompute if certain values has changed only read again if decoded user changes
  // more custom hooks, DRY be DRY
  // after login you can get the user object returned and thats where you can access the regions etc..

  let decoded: any;
  let regionName = "";

  const [regions, setRegions] = useState<Regions[]>([]);
  
  useEffect(() => {
    getRegions().then((res) => setRegions(res));
  }, []);

  const user: any = localStorage.getItem("accessToken");

  if (user) {
    decoded = jwt_decode(user);
  }

  regions.forEach((region) => {
    if (region.id === decoded?.user?.regionid) {
      regionName = region.name;
    }
  });

  const { toggleColorMode } = useColorMode();
  const colors = useColorModeValue("grey.200", "grey.700");
  const SwitchIcon = useColorModeValue(FaSun, FaMoon);
  return (
    <>
      <Flex
        ml={{ base: 0, md: 60 }}
        px={{ base: 4, md: 4 }}
        height="20"
        alignItems="center"
        bg={useColorModeValue("white", "gray.900")}
        borderBottomWidth="1px"
        borderBottomColor={useColorModeValue("gray.200", "gray.700")}
        justifyContent={{ base: "space-between", md: "flex-end" }}
        {...rest}
      >
        <IconButton
          display={{ base: "flex", md: "none" }}
          onClick={onOpen}
          variant="ghost"
          aria-label="open menu"
          icon={<FiMenu />}
        />
        <Searchbar />
        <HStack spacing={{ base: "0", md: "6" }}>
          <IconButton
            size="md"
            variant="ghost"
            aria-label="open menu"
            icon={<FiBell />}
          />
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
                {decoded ? (
                  <>
                    <HStack>
                      <Avatar
                        size={"md"}
                        src={
                          `http://ddragon.leagueoflegends.com/cdn/11.16.1/img/profileicon/${decoded.user.iconid}.png` //change this it is ugly, store in the redux store
                        }
                      />
                      <VStack
                        display={{ base: "none", md: "flex" }}
                        alignItems="flex-start"
                        spacing="1px"
                        ml="2"
                      >
                        <Text fontSize="md">{`${decoded.user.summoner_name}`}</Text>
                        <Text fontSize="xs">{regionName}</Text>
                      </VStack>
                      <Box display={{ base: "none", md: "flex" }}>
                        <FiChevronDown />
                      </Box>
                    </HStack>
                  </>
                ) : (
                  <>
                    <HStack>
                      <Avatar size={"md"} src={""} />
                      <VStack
                        display={{ base: "none", md: "flex" }}
                        alignItems="flex-start"
                        spacing="1px"
                        ml="2"
                      ></VStack>
                      <Box display={{ base: "none", md: "flex" }}>
                        <FiChevronDown />
                      </Box>
                    </HStack>
                  </>
                )}
              </MenuButton>
              <MenuList
                bg={useColorModeValue("#E8E8E8", "gray.900")}
                borderColor={useColorModeValue("gray.200", "gray.700")}
              >
                <Link href="/Profile">
                  <MenuItem>Profile</MenuItem>
                </Link>
                <Link href="/Profile">
                  <MenuItem>Settings</MenuItem>
                </Link>
                <MenuDivider />
                {user ? (
                  <Link href="/">
                    <MenuItem
                      onClick={() => localStorage.removeItem("accessToken")}
                    >
                      Sign Out
                    </MenuItem>
                  </Link>
                ) : (
                  <Link href="/signin">
                    <MenuItem>Sign In</MenuItem>
                  </Link>
                )}
              </MenuList>
            </Menu>
          </Flex>
        </HStack>
      </Flex>
    </>
  );
};

export default MobileNav;
