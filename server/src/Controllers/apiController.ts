require("dotenv").config();
import { Response, Request } from "express";
import { sequelize } from "../Models/index";
const { Region } = require("../Models/region.model");
import { parse, stringify, toJSON, fromJSON } from "flatted";
const { User } = require("../Models/user.model");
const { Matches } = require("../Models/match.model");
import { Topic } from "../Models/topic.model";


import {
  getMatchesByPuuid,
  getMatchInfoByMatchId,
  getSummonerByNameAndRegion,
  getSummonerEntriesByAccountIdAndRegion,
  getMatchInfoByMatchId2,
} from "./utils";
import { asyncForEach } from "../Utils/helpers";
import { Friend } from "../Models/friend.model";
const jwt = require("jsonwebtoken");

export const getRegions = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const regions = await Region.findAll({});
    res.json(regions);
  } catch (err) {
    next(err);
  }
};

export const getMatches = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    let { puuid } = req.params;
    //puuid = 'RSQ6Hfg8BFk4BEx5x_PDhutycLxXjgD8zc19bgMAxRDSBIrkL0ARyru5S9TjEDln-1qP7PPZzAt9Ow'; //test puuid
    const matches = await Matches.findAll({
      where: { puuid: puuid },
      raw: true,
    });

    const letArr = [];
    for (let i = 1; i < 11; i++) {
      letArr.push(matches[0]["match" + i]);
    }

    res.send(letArr).status(200);
  } catch (err) {
    next(err);
  }
};


export const updateMatchesInDb = async (req: Request, res: Response, next: Function) => {
  try {
    let { puuid } = req.params;
    //puuid = 'RSQ6Hfg8BFk4BEx5x_PDhutycLxXjgD8zc19bgMAxRDSBIrkL0ARyru5S9TjEDln-1qP7PPZzAt9Ow'; //test puuid

    let query: any = await sequelize.query(
      `SELECT region FROM public."Users" as U LEFT JOIN public."Regions" as R on U.regionid = R.id WHERE puuid = '${puuid}';`
    );
    let region = query[0][0].region;

    const matches = await getMatchesByPuuid(puuid, region);
    await Matches.destroy({
      where: {
        puuid: puuid
      }
    });

    await sequelize.query(
      `INSERT INTO public."Matches" (puuid, "updatedAt") VALUES ('${puuid}', '2021-08-19 21:16:44.969-03');`
    );
    let i = 1;
    await asyncForEach(matches, async (match: string) => {
      const { data } = await getMatchInfoByMatchId(match, region);
      query = `UPDATE public."Matches" SET match${i} = '${JSON.stringify(data.info)}'::jsonb WHERE puuid = '${puuid}';`;
      await sequelize.query(query);
      i++;
    });
    res.send().status(200);
  } catch (err) {
    next(err);
  }
};

export const getUserInfo = async (req: Request, res: Response, next: Function) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    const decoded = jwt.decode(token);
    const user = await User.findOne({ where: { id: decoded.id } });
    if (user) {
      user.password = '';
      res.status(200).send(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    next(err);
  }
};

export const getUserRanked = async (req: Request, res: Response, next: Function) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    const decoded = jwt.decode(token);
    const user = await User.findOne({ where: { id: decoded.id } });
    if (user) {
      let query: any = await sequelize.query(
        `SELECT code, region FROM public."Users" as U LEFT JOIN public."Regions" as R on U.regionid = R.id WHERE puuid = '${user.dataValues.puuid}';`
      );
      let regionCode = query[0][0].code;

      //Getting ID from user in region, not the PUUID
      let { data } = await getSummonerByNameAndRegion(
        user.dataValues.summoner_name,
        regionCode
      );

      //getting ranked info with that id
      const summoner = await getSummonerEntriesByAccountIdAndRegion(data.id, regionCode);

      if(summoner.data) res.status(200).send(summoner.data);
      else res.status(404).send('No summoner data.');
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    next(err);
  }
};

export const addFriend = async (req: Request, res: Response, next: Function) => {
  try {
    let { userid, friendid } = req.body;
    const friend = await Friend.create({
      userid: userid,
      userfriend: friendid
    });
    res.status(201)
    res.json(friend)
  } catch(err){
    next(err)
  }
}

export const removeFriend = async (req: Request, res: Response, next: Function) => {
  try {
    let { userid, friendid } = req.body;
    const friend = await Friend.findOne({where: {userid: userid, userfriend: friendid}});
    friend?.destroy()
    res.status(204)
  } catch(err){
    next(err)
  }
}

export const addSeen = async (req: Request, res: Response, next: Function) => {
  try {
    let { userid, friendid, postid } = req.body;
    const friend = await Friend.findOne({where: {userid: userid, userfriend: friendid}});

    let friendArr = friend?.seenposts;
    if(friendArr === null || friendArr === undefined || friendArr.length <= 0){
      friendArr = [];
    }
    friend?.update({ seenposts: [...friendArr, postid] });
    res.status(201)
    res.json(friend)
  } catch(err){
    next(err)
  }
}

export const checkFriend = async (req: Request, res: Response, next: Function) => {
  try {
    let { userid, friendid } = req.body;
    const friend: any = await Friend.findOne({where: {userid: userid, userfriend: friendid}});
    const topics: any = await Topic.findAll({where: {userid: friendid}});

    let newArray: number[] = [];
    topics.map((topic: any) => {
      if(!friend.seenposts?.includes(topic.id)){
        newArray.push(topic.id)
      }
    })
    res.json({newPosts: newArray})
  } catch(err){
    next(err)
  }
}

export const getSummoner = async (req: Request, res: Response, next: Function) => {
  try {
    let { summoner_name, region } = req.body;

    let summoner = await getSummonerByNameAndRegion(summoner_name, region);
    let rank = await getSummonerEntriesByAccountIdAndRegion(summoner.data.id, region);
    summoner.data.rank = rank.data
    summoner.data.summoner_name = summoner_name;

    let query: any = await sequelize.query(
      `SELECT region FROM public."Regions" as R WHERE R.code = '${region}';`
    );

    let regionR = query[0][0].region;

    const matches = await getMatchesByPuuid(summoner.data.puuid, regionR);
    await Matches.destroy({
      where: {
        puuid: summoner.data.puuid
      }
    });

    await sequelize.query(
      `INSERT INTO public."Matches" (puuid, "updatedAt") VALUES ('${summoner.data.puuid}', '2021-08-19 21:16:44.969-03');`
    );
    let i = 1;
    summoner.data.matches = []
    await asyncForEach(matches, async (match: string) => {
      const  data  = await getMatchInfoByMatchId2(match, regionR);
      query = `UPDATE public."Matches" SET match${i} = '${JSON.stringify(data)}'::jsonb WHERE puuid = '${summoner.data.puuid}';`;
      await sequelize.query(query);
      summoner.data.matches.push(data)
      i++;
    });
    
    res.status(200).send(summoner.data);
  } catch (err) {
    console.log(err)
    next(err);
  }
}
