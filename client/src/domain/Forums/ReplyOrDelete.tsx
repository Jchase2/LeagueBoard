import { Button } from "@chakra-ui/react";
import { Props } from "framer-motion/types/types";
import { useAppDispatch } from "../../redux/hooks";
import { deleteForumTopic, fetchComments } from "../../redux/slices";
import { useHistory } from "react-router-dom";

const ReplyOrDelete: React.FC<Props> = ({ isReply, setIsReply, thread }) => {
  const dispatch = useAppDispatch();
  let history = useHistory();


  const handleDelete = () => {
    console.log("handleDelete")
    dispatch(deleteForumTopic(thread.id)).then(() => {
      console.log("dispatch then")
      dispatch(fetchComments(thread.parentid))
    });
    if(!thread.parentid){
      history.push('/topics')
    }
  };

  const handleSubmit = () => {
    setIsReply(true)
    dispatch(fetchComments(thread.id))
  }

  return !isReply ? (
    <>
      {!thread.closed &&
      <Button onClick={() => handleSubmit()} m={1}>
        Reply
      </Button>}
      <Button m={1} onClick={handleDelete}>
        Delete
      </Button>
    </>
  ) : <></>
};

export default ReplyOrDelete;
