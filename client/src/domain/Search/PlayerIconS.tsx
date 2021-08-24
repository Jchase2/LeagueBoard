import {
  Heading,
  Avatar,
  Box,
  Text,
  Stack,
  Button,
  Flex,
  useColorModeValue,
  Image,
  Tooltip,
} from "@chakra-ui/react";
import BadgesS from "./BadgesS";
import RankImage from "../../components/ProfileIcon/RankImage";
import { useState } from "react";
import { changeNum } from "../../utils/romanToNum";
import UpdateButton from "../../components/ProfileIcon/UpdateButton";
import { updateUserMatches } from "../../api/profileAPI";

interface props {
  users: any;
  userRank: any;
  regionName: any;
}

const ProfileIconS: React.FC<props> = ({ users, userRank, regionName }) => {
    console.log(users)
    console.log(userRank);
  const [loading, setLoading] = useState<boolean>(false);

  const handleUpdate = () => {
    setLoading(true);
    updateUserMatches(users.puuid);
    setTimeout(() => {
      setLoading(false);
      window.location.reload();
    }, 10000);
  };

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
            ? `http://ddragon.leagueoflegends.com/cdn/11.16.1/img/profileicon/${users?.profileIconId}.png`
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
      <Heading fontSize={"2xl"} fontFamily={"body"} mb={2}>
        {users ? `${users?.name}` : ""}
      </Heading>
      {userRank && <BadgesS userRank={userRank} />}

      <Text fontWeight={600} color={"gray.500"} mb={4} mt={2}>
        # {regionName}
      </Text>
      <Flex justifyContent="space-around">
        <Flex>
          {userRank ? (
            <RankImage rank={userRank?.tier} rankNum={userRank?.rank} />
          ) : (
            <Image minW="125px" maxH="125px" src="latest.png" />
          )}
        </Flex>
        <Flex justifyContent="center" flexDirection="column">
          <Heading
            as="h3"
            size="md"
            color={useColorModeValue("gray.700", "gray.300")}
            px={3}
          >
            Rank Solo/Duo :{" "}
            {userRank
              ? `${userRank?.tier} ${changeNum(userRank?.rank)}`
              : "Unranked"}
          </Heading>
          <Tooltip hasArrow label="Winrate for games played this season">
            <Text>
              {userRank
                ? `${userRank.wins}W ${userRank.losses}L | ${Math.round(
                    (userRank.wins / (userRank.wins + userRank.losses)) * 100
                  )}%`
                : ""}
            </Text>
          </Tooltip>
        </Flex>
      </Flex>
      <Stack mt={8} direction={"row"} spacing={4}>
        <UpdateButton handleupdate={handleUpdate} loading={loading} />
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
            bg: "green.500",
          }}
          _focus={{
            bg: "green.500",
          }}
        >
          Follow
        </Button>
      </Stack>
    </Box>
  );
};

export default ProfileIconS;
