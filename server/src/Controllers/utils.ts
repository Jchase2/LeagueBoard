require('dotenv').config();
const { RIOT_API_TOKEN } = process.env;
const axios = require('axios');

export const getSummonerByNameAndRegion = async (summonerName: string, region: string) => {
  const url = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`;
  
  const { data } = await axios.get(url, {
    headers: {
      'X-Riot-Token': RIOT_API_TOKEN,
      'Origin': `https://developer.riotgames.com`
    }
  })
  return data;
};

export const getSummonerByPuuid = async (puuid: string, region: string) => {
  const url = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`;

  const { data } = await axios.get(url, {
    headers: {
      'X-Riot-Token': RIOT_API_TOKEN,
      'Origin': `https://developer.riotgames.com`
    }
  })
  return data;
}