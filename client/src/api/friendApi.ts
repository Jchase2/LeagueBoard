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
        "http://localhost:3000/topics", {
          data: {
            userid: userid,
            friendid: friendid
          }
        }
    )
    .then((res: { data: any }) => res.data)
    .catch((err) => console.log(err))
}