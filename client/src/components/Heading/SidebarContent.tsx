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
import { GoCommentDiscussion } from "react-icons/go";
import NavItem from "./NavItem"

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

interface LinkItemProps {
  name: string;
  icon: IconType;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Home", icon: FiHome },
  { name: "Trending", icon: FiTrendingUp },
  { name: "Discussion", icon: GoCommentDiscussion },
];

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => (
  <Box
    transition="0.5s ease"
    bg={useColorModeValue("	#E8E8E8", "gray.900")}
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
      <Image src="lol.svg" alt="Logo" />
      <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
    </Flex>
    {LinkItems.map((link) => (
      <NavItem key={link.name} icon={link.icon}>
        {link.name}
      </NavItem>
    ))}
  </Box>
);

export default SidebarContent;
