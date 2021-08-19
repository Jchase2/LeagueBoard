import { ReactText } from "react";
import { Flex, Icon, FlexProps } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { IconType } from "react-icons";

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  linkName: ReactText
}

const NavItem: React.FC<NavItemProps> = ({ icon, children, linkName, ...rest }) => {
  return (
    <Link to={`${linkName}`} style={{ textDecoration: "none" }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "grey",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

export default NavItem;
