import axios from "axios";
//API request for user information

export const getUserMatches = async ( puuid: string ) => {
    return axios
      .get(process.env.REACT_APP_BACKEND_URL + `/matches/${puuid}`)
      .then((res: { data: any }) => res.data);
}
