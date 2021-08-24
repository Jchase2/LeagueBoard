import { Button } from "@chakra-ui/react";
import { Props } from "framer-motion/types/types";
import { addNewFriend, getUserNameBySummonerName } from "../../api/friendApi";
import { useAppSelector } from "../../redux/hooks";

const FollowButton: React.FC<Props> = ({ user }) => {

  const myUser = useAppSelector((state) => state.userReducer.userState);

  const handleClick = async () => {
    getUserNameBySummonerName(user.name).then((res) => {
      console.log(res)
      console.log(myUser)
      if( myUser && res && (myUser?.id !== res?.userid)){
        console.log("RAN")
        addNewFriend(myUser.id, res.userid)
      }
    })
  }

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
      Follow
    </Button>
  );
};

export default FollowButton;
