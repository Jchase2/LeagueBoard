import { Button, Text } from "@chakra-ui/react";
import { Props } from "framer-motion/types/types";
import { useEffect } from "react";
import { useState } from "react";
import {
  addNewFriend,
  amFollowing,
  getUserNameBySummonerName,
  removeFriend,
} from "../../api/friendApi";
import { useAppSelector } from "../../redux/hooks";

const FollowButton: React.FC<Props> = ({ user }) => {
  const myUser = useAppSelector((state) => state.userReducer.userState);
  const [friendid, setFriendId] = useState<number>();
  const [isFollowing, setIsFollowing] = useState<boolean>();

  useEffect(() => {
    getUserNameBySummonerName(user.name).then((res) => {
      console.log(res)
      setFriendId(res?.userid);
      amFollowing(myUser.id, res.userid).then((res) => {
        setIsFollowing(res);
      });
    });
  }, [myUser.id, user.name]);

  const handleClick = async () => {
    if(!friendid){
      alert("Summoner is not registered on LeagueBoard.")
    }
    if (myUser && friendid && myUser?.id !== friendid) {
      if(!isFollowing){
        addNewFriend(myUser.id, friendid)
        setIsFollowing(true);
      } else {
        removeFriend(myUser.id, friendid);
        setIsFollowing(false);
      }
    }
  };

  const renderButton = () => {
    if (myUser && (myUser.id !== user.id)) {
      if (!isFollowing) {
        return (
          <Button
            onClick={handleClick}
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
            <Text>Follow</Text>
          </Button>
        );
      } else if (isFollowing) {
        return (
          <Button
            onClick={handleClick}
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
            <Text>Unfollow</Text>
          </Button>
        );
      }
    }
  };

  return <>{renderButton()}</>;
};

export default FollowButton;