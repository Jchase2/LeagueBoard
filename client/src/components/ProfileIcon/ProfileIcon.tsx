import {
  Heading,
  Avatar,
  Box,
  Text,
  Stack,
  Button,
  Flex,
  useColorModeValue,
  Image
} from "@chakra-ui/react";
import Badges from "./Badges";
import RankImage from "./RankImage";

interface props {
  users: any;
  userRank: any;
  regionName: any
}

const ProfileIcon: React.FC<props> = ({ users, userRank, regionName }) => {
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
      <Badges userRank={userRank}/>
      <Button size="xs" colorScheme="teal" variant="solid" margin="5px">
        Button
      </Button>
      <Text fontWeight={600} color={"gray.500"} mb={4}>
        {regionName}
      </Text>
      <Flex justifyContent="space-around">
        <Flex>
          {console.log("user rank: ", userRank)}
          {userRank?.length ?
          <RankImage rank={userRank[0]?.tier} /> : <Image minW="125px"maxH="125px" src='latest.png'/>
        }
        </Flex>
        <Flex justifyContent="center" flexDirection="column">
          <Heading
            as="h3"
            size="md"
            color={useColorModeValue("gray.700", "gray.300")}
            px={3}
          >
            Rank :{" "}
            {userRank?.length
              ? `${userRank[0]?.tier} ${userRank[0]?.rank}`
              : "Unranked"}
          </Heading>
          <Text>
            {" "}
            {userRank?.length
              ? `${userRank[0].wins}W ${userRank[0].losses}L | ${Math.round((userRank[0].wins / (userRank[0].wins + userRank[0].losses)) * 100)}%`
              : ""}{" "}
          </Text>
        </Flex>
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
};

export default ProfileIcon