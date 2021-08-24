import axios from "axios";

export const getTopicOwner = async (id: number) => {
  return axios
    .get(
      process.env.REACT_APP_BACKEND_URL + `/topics/user/${id}` ||
        `localhost:3001/topics/user/${id}`
    )
    .then((res: { data: any }) => res.data)
    .catch((err) => console.log(err));
};

export const closeForumTopic = async (id: number, state: boolean) => {
  return axios
    .put(
      process.env.REACT_APP_BACKEND_URL + `/topics/close/${id}` ||
        `localhost:3001/topics/close/${id}`,
      {
        topicid: id,
        state: state,
      }
    )
    .then((res: { data: any }) => res.data)
    .catch((err) => console.log(err));
};

export const voteTopic = async (
  topicid: number,
  userid: number,
  vote: number
) => {
  return axios
    .put(
      process.env.REACT_APP_BACKEND_URL + `/vote` ||
        `localhost:3001/vote`,
      {
        topicid,
        userid,
        value: vote,
      }
    )
    .then((res: { data: any }) => res.data)
    .catch((err) => console.log(err));
};

export const getVotes = async (id: number, userid: number) => {
  return axios
    .get(
      process.env.REACT_APP_BACKEND_URL + `/vote/${id}` ||
        `localhost:3001/vote/${id}`,
      {
        headers: {
          userid: userid,
        },
      }
    )
    .then((res: { data: any }) => res.data)
    .catch((err) => console.log(err));
};

export const getVoteCount = async (id: number) => {
  return axios
    .get(
      process.env.REACT_APP_BACKEND_URL + `/votescore/${id}` ||
        "localhost:3001/votescore",
    )
    .then((res: { data: any }) => res.data)
    .catch((err) => console.log(err));
};

export const getForumTopic = async (topicid: number) => {
  return axios
    .get(
      process.env.REACT_APP_BACKEND_URL + `/topics/${topicid}` ||
        `http://localhost:3001/topics/${topicid}`
    )
    .then((res: { data: any }) => res.data);
};

export const getGrandParent = async (topicid: number) => {
  return axios
    .get(
      process.env.REACT_APP_BACKEND_URL + `/topics/grandparent/${topicid}` ||
      `http://localhost:3001/topics/grandparent/${topicid}`
    ).then((res: { data: any }) => res.data);
}
