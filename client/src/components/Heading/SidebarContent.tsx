import {
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  BoxProps,
  Image,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
} from "react-icons/fi";
import { IconType } from "react-icons";
import { SiNintendogamecube } from "react-icons/si";
import { GoCommentDiscussion } from "react-icons/go";
import NavItem from "./NavItem"

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

interface LinkItemProps {
  name: string;
  linkName: string;
  icon: IconType;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Home", icon: FiHome, linkName: "/" },
  { name: "Trending", icon: FiTrendingUp, linkName: "Trending" },
  { name: "Topics", icon: GoCommentDiscussion, linkName: "/topics" },
  { name: "Scrims", icon: SiNintendogamecube, linkName: "/topics/scrims" },
];

// Change REACT.FC for types of components

const SidebarContent: React.FC<SidebarProps> = ({ onClose, ...rest }) => (
  <Box
    transition="0.5s ease"
    bg={useColorModeValue("#F0F8FF", "gray.900")}
    borderRight="2px"
    borderRightColor={useColorModeValue("gray.200", "gray.700")}
    w={{ base: "full", md: 60 }}
    pos="fixed"
    h="full"
    {...rest}
  >
    <Flex
      h="20"
      alignItems="center"
      mx="8"
      justifyContent="space-between"
      marginTop="10px"
      marginBottom="10px"
    >
      <Image src="/lol.svg" alt="Logo" />
      <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
    </Flex>
    {LinkItems.map((link) => (
      <NavItem key={link.name} icon={link.icon} linkName={link.linkName}>
        {link.name}
      </NavItem>
    ))}
  </Box>
);

export default SidebarContent;
