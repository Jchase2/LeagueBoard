import {
  Heading,
  Avatar,
  Box,
  Text,
  Stack,
  Button,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";

interface props {
    users: any
    userRank: any
}

const ProfileIcon: React.FC<props> = ({ users, userRank }) => {

  return (
    <Box
      w={"full"}
      bg={useColorModeValue("white", "gray.900")}
      boxShadow={"2xl"}
      rounded={"lg"}
      p={6}
      textAlign={"center"}
    >
      <Avatar
        size={"xl"}
        src={
          users
            ? `http://ddragon.leagueoflegends.com/cdn/11.16.1/img/profileicon/${users?.iconid}.png`
            : ""
        }
        alt={"Avatar Alt"}
        mb={4}
        pos={"relative"}
        _after={{
          content: '""',
          w: 4,
          h: 4,
          bg: "green.300",
          border: "2px solid white",
          rounded: "full",
          pos: "absolute",
          bottom: 0,
          right: 3,
        }}
      />
      <Heading fontSize={"2xl"} fontFamily={"body"}>
        {users ? `${users?.summoner_name}` : ""}
      </Heading>
      <Button size="xs" colorScheme="teal" variant="solid" margin="5px">
        Button
      </Button>
      <Text fontWeight={600} color={"gray.500"} mb={4}>
        North America
      </Text>
      <Flex>
      <Text
        color={useColorModeValue("gray.700", "gray.400")}
        px={3}
      >
        Rank : {`${userRank[0]?.tier}`} {`${userRank[0]?.rank}`}
      </Text>
      </Flex>
      <Stack mt={8} direction={"row"} spacing={4}>
        <Button
          bgGradient="linear(to-l, #7928CA,#FF0080)"
          flex={1}
          fontSize={"sm"}
          rounded={"full"}
          _hover={{
            bg: "red.500",
          }}
        >
          Update
        </Button>
        <Button
          flex={1}
          fontSize={"sm"}
          rounded={"full"}
          bg={"blue.400"}
          color={"white"}
          boxShadow={
            "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
          }
          _hover={{
            bg: "blue.500",
          }}
          _focus={{
            bg: "blue.500",
          }}
        >
          Follow
        </Button>
      </Stack>
    </Box>
  );
}

export default ProfileIcon