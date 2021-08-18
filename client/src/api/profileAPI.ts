import axios from "axios";
//API request for user information

const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("accessToken"),
  },
};

export const getUserMatches = async (puuid: string) => {
  return axios
    .get(process.env.REACT_APP_BACKEND_URL + `/matches/${puuid}`, config)
    .then((res: { data: any }) => res.data)
    .catch((err) => console.log(err));
};

export const getUserInfo = async () => {
  return axios
    .get(process.env.REACT_APP_BACKEND_URL + "/user", config)
    .then((res: { data: any }) => res.data)
    .catch((err) => console.log(err));
};
