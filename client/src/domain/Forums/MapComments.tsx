import { useAppSelector } from "../../redux/hooks";
import Comment from "./Comment";

interface myProps {
  id: number
}

const MapComments: React.FC<myProps> = (props: myProps) => {

  const commentsArray = useAppSelector(
    (state) => state.commentsReducer.comments
  );
  return (
    <>
      {commentsArray.map((thread: any) => (
        <div key={thread.id}>
          {thread.parentid !== 0 && <Comment id={thread.id} thread={thread} />}
        </div>
      ))}
    </>
  );
};

export default MapComments;
