import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect } from "react";
import { fetchComments } from "../../redux/slices";
import { closeForumTopic } from "../../api/api";
import { Button } from "@chakra-ui/react";
import { Props } from "framer-motion/types/types";

const CloseThread: React.FC<Props> = ({threadData, setThreadData}) => {
  const dispatch = useAppDispatch();
  const commentsArray = useAppSelector(
    (state) => state.commentsReducer.comments
  );

  useEffect(() => {
    dispatch(fetchComments(threadData.id));
  }, [dispatch, threadData.id]);

  const closeThread = () => {
    closeForumTopic(threadData.id, !threadData.closed);
    setThreadData({...threadData, closed: !threadData.closed})
    commentsArray.map((comment) => {
      return closeForumTopic(comment.id, !comment.closed).then(() => {
        dispatch(fetchComments(threadData.id));
      })
    });
  };

  return (
    threadData.closed ?
    <Button onClick={() => closeThread()} m={1}>
      Open Topic
    </Button>
    :
    <>
    <Button onClick={() => closeThread()} m={1}>
      Close Topic
    </Button>
    </>
  );
};

export default CloseThread;
