import { ThreadCard } from "./";

const MapTopics: React.FC<{ topics: any }> = ({ topics }) => {
  return (
    <>
      {topics &&
        [...topics]
          .sort((a, b) => b.id - a.id)
          .map((thread) => (
            <div key={thread.id}>
              {thread.parentid === 0 && <ThreadCard thread={thread} />}
            </div>
          ))}
    </>
  );
};

export default MapTopics;
