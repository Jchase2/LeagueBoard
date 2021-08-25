import axios from "axios";

export const addNewFriend = (userid: number, friendid: number) => {
  axios
    .post(
      process.env.REACT_APP_BACKEND_URL + "/friend/create" ||
        "http://localhost:3000/friend/create",
      {
        userid: userid,
        friendid: friendid,
      }
    )
    .then((res: { data: any }) => res.data)
    .catch((err) => console.log(err));
};

export const removeFriend = (userid: number, friendid: number) => {
  axios
    .put(
      process.env.REACT_APP_BACKEND_URL + "/friend/remove" ||
        "http://localhost:3000/friend/remove",
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

export const getUserNameBySummonerName = (summoner_name: string) => {
  return axios.get(
    process.env.REACT_APP_BACKEND_URL + "/friend/summoner_name" || "http://localhost:3000/friend/summoner_name",
    {
      headers: {
        summoner_name: summoner_name
      }
    }
  ).then((res: { data: any }) => res.data)
  .catch((err) => console.log(err))
}

export const amFollowing = (userid: number, friendid: number) => {
  return axios.get(
    process.env.REACT_APP_BACKEND_URL + "/friend/isfriend" || "http://localhost:3000/friend/isfriend",
    {
      headers: {
        userid: userid,
        friendid: friendid
      }
    }
  ).then((res: { data: any }) => res.data)
  .catch((err) => console.log(err))
}