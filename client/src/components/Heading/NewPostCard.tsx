import { Props } from "framer-motion/types/types";
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { ITopicResp } from "../../interfaces";
import { getTopicOwner, getForumTopic } from "../../api";
import { Text, Container, Button } from "@chakra-ui/react";
import { useAppDispatch } from "../../redux/hooks";
import { checkFriends, markSeen } from "../../redux/slices";
const NewPostCard: React.FC<Props> = ({ threadid, user }) => {

  const dispatch = useAppDispatch();
  const history = useHistory();

  const [threadData, setThreadData] = useState<ITopicResp>({
    id: 0,
    userid: 0,
    parentid: 0,
    title: "",
    text: "",
    closed: false,
    parenttitle: "",
    created_at: "",
    updated_at: "",
  });

  const [threadOwner, setThreadOwner] = useState<string>("");

  useEffect(() => {
    if (threadid) {
      getForumTopic(threadid).then((res) => {
        setThreadData(res);
      });
      getTopicOwner(threadid).then((res) => {
        setThreadOwner(res?.summoner_name);
      });
    }
  }, [threadid]);

  const handleClick = async () => {
    await dispatch(markSeen({
      userid: user.id,
      topicid: threadData.id,
      friendid: threadData.userid
    }))
    dispatch(checkFriends(user.id)).then(() => {
      history.push(`/topic/${threadid}`)
    })
  }

  return threadData.title ? (
    <Button variant="link" onClick={() => handleClick()}>
      <Container maxW="sm">
        <Text isTruncated>
          {threadOwner} posted: {threadData.title}
        </Text>
      </Container>
    </Button>
  ) : null;
};

export default NewPostCard;
