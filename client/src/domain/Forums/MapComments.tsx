import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect } from "react";
import { fetchComments } from "../../redux/slices";
import Comment from "./Comment";

interface myProps {
  id: number
}

const MapComments: React.FC<myProps> = (props: myProps) => {
  const dispatch = useAppDispatch();
  const commentsArray = useAppSelector(
    (state) => state.commentsReducer.comments
  );

  useEffect(() => {
    dispatch(fetchComments(props.id));
  }, [dispatch, commentsArray, props.id]);
  return (
    <>
      {commentsArray?.map((thread: any) => (
        <div key={thread.id}>
          {thread.parentid !== 0 && <Comment id={thread.id} thread={thread} />}
        </div>
      ))}
    </>
  );
};

export default MapComments;
