import ThreadCard from "./ThreadCard";
import { useAppSelector } from "../../redux/hooks";

const MapComments: React.FC = () => {
  const threadArray = useAppSelector((state) => state.topicsReducer.topics);
  return (
    <>
      {threadArray &&
        threadArray.map((thread) => (
          <div key={thread.id}>
            {!(thread.parentid >= 1) && <ThreadCard thread={thread} />}
          </div>
        ))}
    </>
  );
};

export default MapComments;
