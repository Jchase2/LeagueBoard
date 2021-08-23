import axios from "axios";
import { IRegisterForm } from "../interfaces/RegisterForm";
import { setToken } from "./helpers";
import { config } from './config';

export const signUp = async (
  formData: IRegisterForm,
  puuid: string,
  iconid: number
) => {
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
        iconid: iconid,
      }
    )
    .then((res: any) => {
      setToken(res);
      return res;
    })
    .catch((err) => console.log(err));
};

export const verifyEmailAndUser = async (
  regionId: number,
  summoner_name: string,
  email: string
) => {
  let data: any = "";
  let configVerify = {
    headers: {
      "Content-Type": "application/json",
      email: email,
      regionid: regionId,
      summoner_name: summoner_name,
    },
  };
  await axios
    .get(
      process.env.REACT_APP_BACKEND_URL + "/verify/register/user" ||
        "localhost:3001/verify/register/user",
      configVerify
    )
    .then((res: { data: any }) => (data = res.data))
    .catch((err) => {
      throw new Error(err);
    });
  return data;
};

export const getVerifyInfo = async (
  regionId: number,
  summoner_name: string
) => {
  let data: any = "";
  await axios
    .post(
      process.env.REACT_APP_BACKEND_URL + "/register/verify" ||
        "localhost:3001/register/verify",
      {
        regionId: regionId,
        summoner_name: summoner_name,
      }
    )
    .then((res: { data: any }) => (data = res.data))
    .catch((err) => console.log(err));
  return data;
};

export const getRegions = async () => {
  return axios
    .get(
      process.env.REACT_APP_BACKEND_URL + "/regions" || "localhost:3001/",
      config
    )
    .then((res: { data: any }) => res.data)
    .catch((err) => console.log(err));
};

export const signIn = async (form: any) => {
  return axios
    .post(
      process.env.REACT_APP_BACKEND_URL + "/login" || "localhost:3001/login",
      form
    )
    .then((res: any) => {
      setToken(res);
      return res;
    })
    .catch((err) => console.log(err));
};
