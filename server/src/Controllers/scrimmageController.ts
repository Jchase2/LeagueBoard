import { Response, Request } from "express";
const { Scrimmages } = require("../Models/scrimmage.model");
import { sequelize } from "../Models/index";
import { getSummonerByPuuid, getSummonerEntriesByAccountIdAndRegion } from './utils'

export const getAllScrimmages = async (req: Request, res: Response, next: Function) => {
  try {
    const scrimmages = await sequelize.query(`SELECT S.id as id, U.id as userid, date as date,
    "bestOf", team_name1 as "team1Name", team_name2 as "team2Name", player1, player2, player3, player4, player5,
    player6, player7, player8, player9, player10, date, time
    FROM public."Scrimmages" as S
    LEFT JOIN
    public."Users" as U
    on S.userid_posted = U.id`);

    res.json(scrimmages[0]).status(200);
  } catch (err) {
    next(err);
  }
}

export const getScrimmage = async (req: Request, res: Response, next: Function) => {
  try {
    const { id } = req.params;

    let scrimmages: any = await sequelize.query(`SELECT S.id as scrimmageid, U.id as userid, R.code as region, date as date,
      "bestOf", team_name1 as team1, team_name2 as team2, player1,
      (SELECT BTRIM(P.PUUID) FROM public."Users" as P WHERE BTRIM(LOWER(summoner_name)) = BTRIM(LOWER(player1))) as PUUID1,
      player2,
      (SELECT BTRIM(P.PUUID) FROM public."Users" as P WHERE BTRIM(LOWER(summoner_name)) = BTRIM(LOWER(player1))) as PUUID2,
      player3,
      (SELECT BTRIM(P.PUUID) FROM public."Users" as P WHERE BTRIM(LOWER(summoner_name)) = BTRIM(LOWER(player1))) as PUUID3,
      player4,
      (SELECT BTRIM(P.PUUID) FROM public."Users" as P WHERE BTRIM(LOWER(summoner_name)) = BTRIM(LOWER(player1))) as PUUID4,
      player5,
      (SELECT BTRIM(P.PUUID) FROM public."Users" as P WHERE BTRIM(LOWER(summoner_name)) = BTRIM(LOWER(player1))) as PUUID5,
      player6,
      (SELECT BTRIM(P.PUUID) FROM public."Users" as P WHERE BTRIM(LOWER(summoner_name)) = BTRIM(LOWER(player1))) as PUUID6,
      player7,
      (SELECT BTRIM(P.PUUID) FROM public."Users" as P WHERE BTRIM(LOWER(summoner_name)) = BTRIM(LOWER(player7))) as PUUID7,
      player8,
      (SELECT BTRIM(P.PUUID) FROM public."Users" as P WHERE BTRIM(LOWER(summoner_name)) = BTRIM(LOWER(player8))) as PUUID8,
      player9,
      (SELECT BTRIM(P.PUUID) FROM public."Users" as P WHERE BTRIM(LOWER(summoner_name)) = BTRIM(LOWER(player9))) as PUUID9,
      player10,
      (SELECT BTRIM(P.PUUID) FROM public."Users" as P WHERE BTRIM(LOWER(summoner_name)) = BTRIM(LOWER(player10))) as PUUID10, date, time
      FROM public."Scrimmages" as S
      LEFT JOIN
        public."Users" as U
          on S.userid_posted = U.id
      LEFT JOIN
        public."Regions" as R
	        on R.id = U.regionid
      WHERE S.id = ${id}`);

    scrimmages = scrimmages[0][0];

    console.time('time')
    await retrieveAndSetRankInfoOfPlayers(scrimmages);
    console.timeEnd('time')

    console.log(scrimmages)

    res.json(scrimmages).status(200);
  } catch (err) {
    console.log(err)
    next(err);
  }
}

export const postScrimmage = async (req: Request, res: Response, next: Function) => {
  try {
    const {
      userid, date, time, bestOf, team1Name, team2Name,
      player1, player2, player3, player4, player5,
      player6, player7, player8, player9, player10 } = req.body;

    const scrimmage = await Scrimmages.create({
      userid_posted: userid,
      date: date,
      time: time,
      bestOf: bestOf,
      team_name1: team1Name,
      team_name2: team2Name,
      player1: player1,
      player2: player2,
      player3: player3,
      player4: player4,
      player5: player5,
      player6: player6,
      player7: player7,
      player8: player8,
      player9: player9,
      player10: player10,
    });

    res.status(201);
    res.json(scrimmage);
  } catch (err) {
    next(err);
  }
}


const retrieveAndSetRankInfoOfPlayers = async (scrimmages: any) => {

  //player1
  let player = await getSummonerByPuuid(scrimmages.puuid1, scrimmages.region);
  scrimmages.player1info = player;
  let ranked = await getSummonerEntriesByAccountIdAndRegion(player.id, scrimmages.region);
  scrimmages.player1ranked = ranked.data;

  //player2
  player = await getSummonerByPuuid(scrimmages.puuid2, scrimmages.region);
  scrimmages.player2info = player;
  ranked = await getSummonerEntriesByAccountIdAndRegion(player.id, scrimmages.region);
  scrimmages.player2ranked = ranked.data;

  //player3
  player = await getSummonerByPuuid(scrimmages.puuid3, scrimmages.region);
  scrimmages.player3info = player;
  ranked = await getSummonerEntriesByAccountIdAndRegion(player.id, scrimmages.region);
  scrimmages.player3ranked = ranked.data;

  //player4
  player = await getSummonerByPuuid(scrimmages.puuid4, scrimmages.region);
  scrimmages.player4info = player;
  ranked = await getSummonerEntriesByAccountIdAndRegion(player.id, scrimmages.region);
  scrimmages.player4ranked = ranked.data;

  //player5
  player = await getSummonerByPuuid(scrimmages.puuid5, scrimmages.region);
  scrimmages.player5info = player;
  ranked = await getSummonerEntriesByAccountIdAndRegion(player.id, scrimmages.region);
  scrimmages.player5ranked = ranked.data;

  //player6
  player = await getSummonerByPuuid(scrimmages.puuid6, scrimmages.region);
  scrimmages.player6info = player;
  ranked = await getSummonerEntriesByAccountIdAndRegion(player.id, scrimmages.region);
  scrimmages.player6ranked = ranked.data;

  //player7
  player = await getSummonerByPuuid(scrimmages.puuid7, scrimmages.region);
  scrimmages.player7info = player;
  ranked = await getSummonerEntriesByAccountIdAndRegion(player.id, scrimmages.region);
  scrimmages.player7ranked = ranked.data;

  //player8
  player = await getSummonerByPuuid(scrimmages.puuid8, scrimmages.region);
  scrimmages.player8info = player;
  ranked = await getSummonerEntriesByAccountIdAndRegion(player.id, scrimmages.region);
  scrimmages.player8ranked = ranked.data;

  //player9
  player = await getSummonerByPuuid(scrimmages.puuid9, scrimmages.region);
  scrimmages.player9info = player;
  ranked = await getSummonerEntriesByAccountIdAndRegion(player.id, scrimmages.region);
  scrimmages.player9ranked = ranked.data;

  //player10
  player = await getSummonerByPuuid(scrimmages.puuid10, scrimmages.region);
  scrimmages.player10info = player;
  ranked = await getSummonerEntriesByAccountIdAndRegion(player.id, scrimmages.region);
  scrimmages.player10ranked = ranked.data;
}
