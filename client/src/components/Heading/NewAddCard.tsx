import { Props } from "framer-motion/types/types";
import { useEffect, useState } from "react";
import { Text, Container, Button } from "@chakra-ui/react";
import { getUserNameById } from "../../api/friendApi";
import { markFriendHasSeen } from "../../redux/slices/friendsSlice";
import { useAppDispatch } from "../../redux/hooks";
const NewPostCard: React.FC<Props> = ({ user, friendid }) => {

  const dispatch = useAppDispatch();
  const [userName, setUserName] = useState<string>("")


  useEffect(() => {
    getUserNameById(friendid).then((res) => {
      setUserName(res.summoner_name)
    })
  }, [friendid])

  const handleClick = async () => {
    if(user?.id && friendid){
      dispatch(markFriendHasSeen({userid: user.id, friendid: friendid}))
    }
  }

  return userName ? (
    <Button variant="link" onClick={() => handleClick()}>
      <Container maxW="sm">
        <Text isTruncated>
          {userName} is following you!
        </Text>
      </Container>
    </Button>
  ) : null;
};

export default NewPostCard;