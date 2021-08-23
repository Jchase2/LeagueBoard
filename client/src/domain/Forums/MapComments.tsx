import { useAppSelector } from "../../redux/hooks";
import { Comment } from "./";

const MapComments: React.FC = () => {

  const commentsArray = useAppSelector(
    (state) => state.commentsReducer.comments
  );

  return (
    <>
      {commentsArray.length !== 0 &&
        commentsArray.map((thread: any) => (
          <div key={thread.id}>
            {thread.parentid !== 0 && (
              <Comment id={thread.id} thread={thread} />
            )}
          </div>
        ))}
    </>
  );
};

export default MapComments;
