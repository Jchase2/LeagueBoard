import axios from "axios";
import { IRegisterForm } from "../interfaces/RegisterForm";
import { ITopic } from "../interfaces/Topics";

// Api file, for now all API calls will be handled from here.
// If we end up with lots of different calls to the backend, we
// can split this out into multiple files.

// Post request to signup

export const signUp = async (formData: IRegisterForm, puuid: string, iconid: number) => {
  return axios
    .post(
      process.env.REACT_APP_BACKEND_URL + "/register" ||
        "http://localhost:3000/register",
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

// Post request to login
export const signIn = async (form: any) => {
  return axios
    .post(
      process.env.REACT_APP_BACKEND_URL + "/login" || "http://localhost:3001/login",
      form
    )
    .then((res: { data: any }) => res.data);
};

export const getVerifyInfo = async (regionId: number, summonerName: string) => {
  let data : any= "";
  await axios
    .post(
      process.env.REACT_APP_BACKEND_URL + "/register/verify" ||
        "http://localhost:3001/register/verify",
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
    .get(process.env.REACT_APP_BACKEND_URL + "/regions" || "http://localhost:3001/regions")
    .then((res: { data: any }) => res.data);
};

export const getForumTopics = async () => {
  return axios
    .get(process.env.REACT_APP_BACKEND_URL + "/topics" || "http://localhost:3001/topics")
    .then((res: { data: any }) => res.data);
};

export const createTopic = async (formData: ITopic) => {
  return axios
    .post(
      process.env.REACT_APP_BACKEND_URL + "/topics" ||
        "http://localhost:3000/topics",
      {
        "title": formData.text,
        "text": formData.text,
        "userid": formData.userid,
        "closed": formData.closed
      }
    )
    .then((res: { data: any }) => res.data);
};