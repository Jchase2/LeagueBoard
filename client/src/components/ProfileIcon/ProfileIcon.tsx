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
import Badges from "./Badges";
import RankImage from "./RankImage";
import {useState} from 'react'
import { changeNum } from "../../utils/romanToNum";
import { useAppDispatch } from "../../redux/hooks";
import {
  setMatches,
} from "../../redux/slices";
import UpdateButton from "./UpdateButton"


interface props {
  users: any;
  userRank: any;
  regionName: any;
}

const ProfileIcon: React.FC<props> = ({ users, userRank, regionName }) => {

  const [loading, setLoading] = useState<boolean>(false)
  const dispatch = useAppDispatch();

  const handleUpdate = () => {
    setLoading(true);
    dispatch(setMatches());
    setTimeout(() => {
      setLoading(false)
    }, 10000)
  }

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
      <Heading fontSize={"2xl"} fontFamily={"body"} mb={2}>
        {users ? `${users?.summoner_name}` : ""}
      </Heading>
        {userRank?.length && 
           <Badges userRank={userRank} />}

      <Text fontWeight={600} color={"gray.500"} mb={4} mt={2}>
        # {regionName}
      </Text>
      <Flex justifyContent="space-around">
        <Flex>
          {userRank && userRank?.length ? (
            <RankImage rank={userRank[0]?.tier} rankNum={userRank[0]?.rank} />
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
            {userRank?.length
              ? `${userRank[0]?.tier} ${changeNum(userRank[0]?.rank)}`
              : "Unranked"}
          </Heading>
          <Tooltip hasArrow label="Winrate for games played this season">
            <Text>
              {userRank?.length
                ? `${userRank[0].wins}W ${userRank[0].losses}L | ${Math.round(
                    (userRank[0].wins /
                      (userRank[0].wins + userRank[0].losses)) *
                      100
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

export default ProfileIcon;
