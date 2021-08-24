import axios from "axios";

export const addNewFriend = (userid: number, friendid: number) => {
  axios
    .post(
      process.env.REACT_APP_BACKEND_URL + "/topics" ||
        "http://localhost:3000/topics",
      {
        userid: userid,
        topicid: friendid,
      }
    )
    .then((res: { data: any }) => res.data)
    .catch((err) => console.log(err));
};

export const removeFriend = (userid: number, friendid: number) => {
  axios
    .delete(
      process.env.REACT_APP_BACKEND_URL + "/topics" ||
        "http://localhost:3000/topics",
      {
        data: {
          userid: userid,
          friendid: friendid,
        },
      }
    )
    .then((res: { data: any }) => res.data)
    .catch((err) => console.log(err));
};

export const markFriendHasSeen = (userid: number, friendid: number) => {
  axios
    .put(
      process.env.REACT_APP_BACKEND_URL + "/friend/hasseen" ||
        "http://localhost:3000/friend/hasseen",
      {
        userid: userid,
        friendid: friendid,
      }
    )
    .then((res: { data: any }) => res.data)
    .catch((err) => console.log(err));
};

export const getUserNameById = (userid: number) => {
  return axios.get(
    process.env.REACT_APP_BACKEND_URL + "/friend/getUserNameById" || "http://localhost:3000/friend/getUserNameById",
    {
      headers: {
        userid: userid
      }
    }
  ).then((res: { data: any }) => res.data)
  .catch((err) => console.log(err))
}