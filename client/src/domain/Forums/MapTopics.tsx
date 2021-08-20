import ThreadCard from "./ThreadCard";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect } from "react";
import { fetchForumTopics } from "../../redux/slices/topicsSlice";

const MapTopics: React.FC = () => {
  const dispatch = useAppDispatch()
  const threadArray = useAppSelector((state) => state.topicsReducer.topics);
  useEffect(() => {
    dispatch(fetchForumTopics());
  }, [dispatch]);  return (
    <>
      {threadArray &&
        [...threadArray].sort((a, b) => b.id - a.id).map((thread) => (
          <div key={thread.id}>
            {!(thread.parentid >= 1) && <ThreadCard thread={thread} />}
          </div>
        ))}
    </>
  );
};

export default MapTopics;
