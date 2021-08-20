require("dotenv").config();
import { Response, Request } from "express";
import { sequelize } from "../Models/index";
const { Region } = require("../Models/region.model");
const { Topic } = require("../Models/topic.model");
const { User } = require("../Models/user.model");
const { Matches } = require("../Models/match.model");

import {
  getMatchesByPuuid,
  getMatchInfoByMatchId,
  getSummonerByNameAndRegion,
  getSummonerEntriesByAccountIdAndRegion,
} from "./utils";
import { asyncForEach } from "../Utils/helpers";
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

export const getMatches = async (req: Request, res: Response, next: Function) => {
  try {
    let { puuid } = req.params;
    //puuid = 'RSQ6Hfg8BFk4BEx5x_PDhutycLxXjgD8zc19bgMAxRDSBIrkL0ARyru5S9TjEDln-1qP7PPZzAt9Ow'; //test puuid
    const matches = await Matches.findAll({where: { puuid: puuid }});
    res.send(matches[0].dataValues).status(200);
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
      let query = `UPDATE public."Matches" SET match${i} = '${JSON.stringify(data.info)}'::jsonb WHERE puuid = '${puuid}';`;
      await sequelize.query(query);
      i++;
    });
    res.send().status(200);
  } catch (err) {
    next(err);
  }
};

export const getForumTopicById = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    let { topicid } = req.params;
    const topic = await Topic.findByPk(topicid);
    res.json(topic);
  } catch (err) {
    next(err);
  }
};

export const deleteForumTopic = async (req: Request, res: Response, next: Function) => {
  try {
    let { topicid } = req.params;
    const topic = await Topic.findByPk(topicid);
    //const topics = await Topic.findAll({});
    await Topic.destroy({ where: { parentid: topic.id }})
    await topic.destroy();
    res.json(topic)
    res.status(204)
  } catch (err) {
    console.log(err.message)
    next(err);
  }
}

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

export const getForumTopics = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const topics = await Topic.findAll({});
    res.json(topics);
  } catch (err) {
    next(err);
  }
};

export const getForumComments = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    let { parentid } = req.params;
    let query: any = await sequelize.query(
      `WITH RECURSIVE comments AS (
        SELECT
        id, title, text, userid, parentid, closed, created_at, text('') as parenttitle
      FROM
          public."Topics" AS P
      WHERE
          P.id = ${parentid}
      UNION ALL
      SELECT
        p.id, P.title, p.text, p.userid, p.parentid, p.closed, p.created_at, s.title as parenttitle
      FROM
          public."Topics" AS P
      INNER JOIN comments s ON s.ID = p.parentid
  )
  SELECT * FROM comments ORDER BY created_at asc;`
    );
    res.json(query[0]);
  } catch (err) {
    next(err);
  }
};

export const postForumTopic = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const topics = await Topic.create({
      title: req.body.title,
      text: req.body.text,
      userid: req.body.userid,
      parentid: req.body.parentid,
      closed: false,
    });
    res.status(201);
    res.json(topics);
  } catch (err) {
    next(err);
  }
};