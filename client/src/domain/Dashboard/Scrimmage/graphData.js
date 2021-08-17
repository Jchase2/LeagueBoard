const queue = ['RANKED_SOLO_5x5', 'RANKED_TFT', 'RANKED_FLEX_SR', 'RANKED_FLEX_TT'];
const tier = ['IRON', 'BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'DIAMOND', 'MASTER', 'GRANDMASTER', 'CHALLENGER'];
const division = ['IV', 'III', 'II', 'I'];

const region = ['br1', 'eun1', 'euw1', 'jp1', 'kr', 'la1', 'la2', 'oc1', 'ru', 'tr1'];


const urlStart = 'https://';
const baseUrl = 'api.riotgames.com';
const api_key = 'RGAPI-268c6d28-8a8e-4e63-85b7-f5f67d4a66ec';

function stepOne () {

 let leagueObjs = [];
  for (let i = 0; i < region.length; i++) {
    for (let i = 0; i < tier.length; i++) {
      for (let i = 0; i < division.length; i++) {
        fetch(`https://${region[i]}api.riotgames.com/lol/league-exp/v4/entries/${queue[0]}/${tier[i]}/${division[i]}?page=10&api_key=${api_key}`)
          .then((res) => res.json())
          .then((obj) => {
            let leagueObjs = obj.map(object => {
              return object;
            })
            
          Promise.all(leagueObjs).then((res) => {
            const summoner_names = [];
            res.flat().forEach(el => {
              !summoner_names.find(summonerEl => summonerEl.id === el.id) && .summoner_names.push(el);
            })

            
          })
        })
      }
    }
  }
  
 
  return Promise.all

}


















stepOne()