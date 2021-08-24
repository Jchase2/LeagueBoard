import { Props } from "framer-motion/types/types";
import { useEffect, useState } from "react";
import { Text, Container, Button } from "@chakra-ui/react";
import { getUserNameById } from "../../api/friendApi";
const NewPostCard: React.FC<Props> = ({ user, friendid }) => {

  console.log("FRIEND ID: ", friendid)

  const [userName, setUserName] = useState<string>("")

  useEffect(() => {
    console.log("WTF")
    getUserNameById(friendid).then((res) => {
      console.log("RES: ", res)
      setUserName(res)
    })
  }, [])

  console.log("userName: ", userName)

  const handleClick = async () => {
    // TODO
    // mark as seen

    // redirect to use page
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
