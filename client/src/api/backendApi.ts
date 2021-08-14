import axios from "axios";
import { IUser } from "../interfaces/User";

// Api file, for now all API calls will be handled from here.
// If we end up with lots of different calls to the backend, we
// can split this out into multiple files.

// Post request to signup

export const signUp = async (form: IUser) => {
  return (
    await axios
      .post(process.env.REACT_APP_BACKEND_URL + '/register' || 'localhost:3000/register', form)
      .then((res: { data: any; }) => res.data)
  );
}

export const getVerifyInfo = async (regionId: number, summonerName: string ) => {
  return (
    await axios
      .post(process.env.REACT_APP_BACKEND_URL + '/register/verify' || 'localhost:3000/register/verify',
      {
        regionId,
        summonerName
      })
      .then((res: { data: any; }) => res.data)
  );
}

export const getRegions = async () => {
  return (
    await axios
      .get(process.env.REACT_APP_BACKEND_URL + '/' || 'localhost:3000/',)
      .then((res: { data: any; }) => res.data)
  );
}

// Post request to login

export const signIn = async (form: IUser) => {
  return (
    await axios
      .post(process.env.REACT_APP_BACKEND_URL + '/login' || 'localhost:3000/login', form)
      .then((res: { data: any; }) => res.data)
  );
}


