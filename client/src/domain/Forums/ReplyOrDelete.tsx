import { Button } from "@chakra-ui/react";
import { Props } from "framer-motion/types/types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { deleteForumTopic, fetchComments } from "../../redux/slices";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTopicOwner, getGrandParent } from "../../api";

const ReplyOrDelete: React.FC<Props> = ({ isReply, setIsReply, thread }) => {

  const dispatch = useAppDispatch();
  let history = useHistory();
  const user = useAppSelector((state) => state.userReducer.userState);

  const [threadCreator, setThreadCreator] = useState<String>("");

  useEffect(() => {
    getTopicOwner(thread.id).then((owner) => {
      setThreadCreator(owner?.summoner_name);
    });
  }, [thread.id]);

  const handleDelete = async () => {
    let gpTopic = await getGrandParent(thread.id);
    await dispatch(deleteForumTopic(thread.id));
    await dispatch(fetchComments(gpTopic.grandparent))
    if (!thread.parentid) {
      history.push("/topics");
    }
  };

  const handleSubmit = () => {
    setIsReply(true);
  };

  return !isReply && user ? (
    <>
      {!thread.closed && (
        <Button onClick={() => handleSubmit()} m={1}>
          Reply
        </Button>
      )}
      {threadCreator === user.summoner_name && (
        <Button m={1} onClick={handleDelete}>
          Delete
        </Button>
      )}
    </>
  ) : (
    <></>
  );
};

export default ReplyOrDelete;
