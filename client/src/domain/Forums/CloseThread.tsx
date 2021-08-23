import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect, useState } from "react";
import { fetchComments } from "../../redux/slices";
import { closeForumTopic, getTopicOwner } from "../../api/api";
import { Button } from "@chakra-ui/react";
import { Props } from "framer-motion/types/types";

const CloseThread: React.FC<Props> = ({ threadData, setThreadData }) => {
  const [threadCreator, setThreadCreator] = useState<number>(0);

  const dispatch = useAppDispatch();
  const commentsArray = useAppSelector(
    (state) => state.commentsReducer.comments
  );
  const user = useAppSelector((state) => state.userReducer.userState);

  useEffect(() => {
    if (threadData.id) {
      dispatch(fetchComments(threadData.id));
      getTopicOwner(threadData.id).then((owner) => {
        setThreadCreator(owner?.id);
      });
    }
  }, [dispatch, threadData.id]);

  const closeThread = () => {
    closeForumTopic(threadData.id, !threadData.closed);
    setThreadData({ ...threadData, closed: !threadData.closed });
    commentsArray.map((comment) => {
      return closeForumTopic(comment.id, !comment.closed).then(() => {
        dispatch(fetchComments(threadData.id));
      });
    });
  };

  return threadData.closed && threadCreator === user.id ? (
    <Button onClick={() => closeThread()} m={1}>
      Open Topic
    </Button>
  ) : (
    <>
      {threadCreator === user.id && (
        <Button onClick={() => closeThread()} m={1}>
          Close Topic
        </Button>
      )}
    </>
  );
};

export default CloseThread;
