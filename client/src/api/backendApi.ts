import axios from "axios";
import { IRegisterForm } from "../interfaces/RegisterForm";

// Api file, for now all API calls will be handled from here.
// If we end up with lots of different calls to the backend, we
// can split this out into multiple files.

// Post request to signup
const baseURL = process.env.REACT_APP_BACKEND_URL;
const API = axios.create({ baseURL });

export const signUp = async (formData: IRegisterForm, puuid: string, iconid: number) => {
  return axios
    .post(
      baseURL + "/register" ||
        "localhost:3001/register",
      { 
        email: formData.email, 
        password: formData.password, 
        regionid: formData.regionId,
        summonerName: formData.summonerName,
        puuid: puuid,
        iconid: iconid
      }
    )
    .then((res: { data: any }) => res.data);
};

export const getVerifyInfo = async (regionId: number, summonerName: string) => {

  let data : any= "";
  await axios
    .post(
      baseURL + "/register/verify" ||
        "localhost:3001/register/verify",
      {
        regionId: regionId,
        summonerName: summonerName,
      }
    )
    .then((res: { data: any }) => (data = res.data));
  return data;
};

export const getRegions = async () => {
  return axios
    .get(baseURL + "/regions" || "localhost:3001/")
    .then((res: { data: any }) => res.data);
};

// Post request to login

export const signIn = async (form: any) => {
  return axios
    .post(
      baseURL + "/login" || "localhost:3001/login",
      form
    )
    .then((res: { data: any }) => res.data);
};

export const getUserInfo = async () => {
  return axios
    .get(baseURL + "/regions" || "localhost:3001/")
    .then((res: { data: any }) => res.data);
};

export const getRecentMatches = () => API.get('/matches/:puuid');