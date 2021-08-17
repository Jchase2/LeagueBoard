import axios from "axios";
import { IRegisterForm } from "../interfaces/RegisterForm";
import { ITopic } from "../interfaces/Topics";
import { IUser } from "../interfaces/User";

// Api file, for now all API calls will be handled from here.
// If we end up with lots of different calls to the backend, we
// can split this out into multiple files.

// Post request to signup

export const signUp = async (formData: IRegisterForm, puuid: string, iconid: number) => {
  return axios
    .post(
      process.env.REACT_APP_BACKEND_URL + "/register" ||
        "localhost:3001/register",
      {
        email: formData.email,
        password: formData.password,
        regionid: formData.regionId,
        summoner_name: formData.summoner_name,
        puuid: puuid,
        iconid: iconid
      }
    )
    .then((res: { data: any }) => res.data);
};

export const getVerifyInfo = async (regionId: number, summoner_name: string) => {
  let data : any= "";
  await axios
    .post(
      process.env.REACT_APP_BACKEND_URL + "/register/verify" ||
        "http://localhost:3001/register/verify",
      {
        regionId: regionId,
        summoner_name: summoner_name,
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

export const getForumTopic = async (topicid: number) => {
  return axios
    .get(process.env.REACT_APP_BACKEND_URL + `/topics/${topicid}` || `http://localhost:3001/topics/${topicid}`)
    .then((res: { data: any }) => res.data);
};

export const getForumComments = async (parentid: number) => {
  return axios
    .get(process.env.REACT_APP_BACKEND_URL + `/topics/comments/${parentid}` || "http://localhost:3001/topics")
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
        "title": formData.title,
        "text": formData.text,
        "userid": formData.userid,
        "closed": formData.closed,
        "parentid": formData.parentid
      }
    )
    .then((res: { data: any }) => res.data);
};

// Post request to login
export const signIn = async (form: IUser) => {
  return (
    await axios
      .post(process.env.REACT_APP_BACKEND_URL + '/login' || 'localhost:3000/login', form)
      .then((res: { data: any; }) => res.data)
  );
}