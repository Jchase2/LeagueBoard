import axios from "axios";
import { IRegisterForm } from "../interfaces/RegisterForm";
import { ITopic } from "../interfaces/Topics";

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

export const getForumTopic = async (topicid: number) => {
  return axios
    .get(process.env.REACT_APP_BACKEND_URL + `/topics/${topicid}` || `http://localhost:3001/topics/${topicid}`)
    .then((res: { data: any }) => res.data);
};

export const getForumTopics = async () => {
  return axios
    .post(
      baseURL + "/login" || "localhost:3001/login",
    )
    .then((res: { data: any }) => res.data);
};

export const createTopic = async (formData: ITopic) => {
  return axios
    .post(
      baseURL + "/topics" ||
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

export const getUserInfo = async () => {
  return axios
    .get(baseURL + "/regions" || "localhost:3001/")
    .then((res: { data: any }) => res.data);
};

export const getRecentMatches = () => API.get('/matches/:puuid');
