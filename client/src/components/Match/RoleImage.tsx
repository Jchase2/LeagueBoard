import { Flex, Image, Text } from "@chakra-ui/react";
import { convertToRole } from "../../utils/convertToRole";

interface Props {
  rank: string;
  role: any;
  message: String;
}

const RoleImage: React.FC<Props> = ({ rank, role, message }) => {
  role = convertToRole(role);
  return (
    <>
      {role && (
        <Flex justifyContent="center" alignItems="center">
          <Image src={`../Position_${rank}-${role}.png`} alt="rankimg" />
          <Text textAlign="center">{message}</Text>
        </Flex>
      )}
    </>
  );
};

export default RoleImage;
