require("dotenv").config();
const { RIOT_API_TOKEN } = process.env;
const axios = require("axios");

const header = {
  "X-Riot-Token": RIOT_API_TOKEN,
  Origin: `https://developer.riotgames.com`,
};

export const getSummonerByNameAndRegion = async (
  summoner_name: string,
  region: string
) => {
  const url = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner_name}`;
  return await axios.get(url, {
    headers: header,
  });
};

export const getSummonerByPuuid = async (puuid: string, region: string) => {
  const url = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`;

  const { data } = await axios.get(url, {
    headers: header,
  });
  return data;
};

export const getSummonerEntriesByAccountIdAndRegion = async (
  id: string,
  region: string
) => {
  const url = `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}`;
  return await axios.get(url, {
    headers: header,
  });
};

export const getMatchesByPuuid = async (puuid: string, region: string) => {
  const url = `https://${region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10`;
  const { data } = await axios.get(url, {
    headers: header,
  });
  return data;
};

export const getMatchInfoByMatchId = async (
  matchid: string,
  region: string
) => {
  const url = `https://${region}.api.riotgames.com/lol/match/v5/matches/${matchid}`;
  const { data } = await axios.get(url, {
    headers: header,
  });
  return data;
};
