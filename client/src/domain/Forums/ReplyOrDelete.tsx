import { Button } from "@chakra-ui/react";
import { Props } from "framer-motion/types/types";
import { useAppDispatch } from "../../redux/hooks";
import { deleteForumTopic } from "../../redux/slices";

const ReplyOrDelete: React.FC<Props> = ({ isReply, setIsReply, thread }) => {
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(deleteForumTopic(thread.id));
  };

  return !isReply ? (
    <>
      <Button onClick={() => setIsReply(true)} m={1}>
        Reply
      </Button>
      <Button m={1} onClick={handleDelete}>
        Delete
      </Button>
    </>
  ) : null
};

export default ReplyOrDelete;
