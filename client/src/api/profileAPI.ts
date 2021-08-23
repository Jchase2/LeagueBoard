import axios from "axios";
import { config } from './config';
//API request for user information

export const getUserMatches = async (puuid: string) => {
  return axios
    .get(process.env.REACT_APP_BACKEND_URL + `/matches/${puuid}`, config)
    .then((res: { data: any }) => res.data)
    .catch((err) => console.log(err));
};

export const updateUserMatches = async (puuid: string) => {
  return axios
    .post(process.env.REACT_APP_BACKEND_URL + `/matches/update/${puuid}`, config)
    .then((res: { data : any }) => res.data)
    .catch((err) => console.log(err))
}

export const getUserInfo = async () => {
  return axios
    .get(process.env.REACT_APP_BACKEND_URL + "/user", config)
    .then((res: { data: any }) => res.data)
    .catch((err) => console.log(err));
};

export const getUserRank = async () => {
  return axios.get(process.env.REACT_APP_BACKEND_URL + "/user/ranked", config)
  .then((res: { data: any }) => res.data)
  .catch((err) => console.log(err));
}
