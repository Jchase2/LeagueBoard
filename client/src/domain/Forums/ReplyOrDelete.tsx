import { Button } from "@chakra-ui/react";
import { Props } from "framer-motion/types/types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { deleteForumTopic, fetchComments } from "../../redux/slices";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTopicOwner } from "../../api/api";

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

  const handleDelete = () => {
    dispatch(deleteForumTopic(thread.id)).then(() => {
      dispatch(fetchComments(thread.parentid));
    });
    if (!thread.parentid) {
      history.push("/topics");
    }
  };

  const handleSubmit = () => {
    setIsReply(true);
    dispatch(fetchComments(thread.id));
  };

  return !isReply ? (
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
