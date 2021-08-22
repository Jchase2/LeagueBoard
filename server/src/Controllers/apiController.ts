require("dotenv").config();
import { Response, Request } from "express";
import { sequelize } from "../Models/index";
const { Region } = require("../Models/region.model");
const { Topic } = require("../Models/topic.model");
const { Votes } = require("../Models/vote.model");
const { User } = require("../Models/user.model");
const { Matches } = require("../Models/match.model");

import {
  getMatchesByPuuid,
  getMatchInfoByMatchId,
  getSummonerByNameAndRegion,
  getSummonerEntriesByAccountIdAndRegion,
} from "./utils";
import { asyncForEach } from "../Utils/helpers";
import { Op } from "sequelize";
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

export const closeForumTopic = async (req: Request, res: Response, next: Function) => {
  try {
    let { topicid, state } = req.body;
    const topic = await Topic.findByPk(topicid);
    await topic.update({ closed: state });
    res.json(topic);
  } catch (err) {
    next(err);
  }
}



export const getForumOwner = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    let { topicid } = req.params;
    const topic = await Topic.findByPk(topicid);
    const user = await User.findByPk(topic.userid);
    res.json(user);
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
    next(err);
  }
}

export const getVote = async (req: Request, res: Response, next: Function) => {
  const { userid } = req.headers;
  const { id } = req.params;
  try {
    let val = await Votes.findOne({where: {
      [Op.and]: [{ topicid: id }, { userid: userid }]}})
    res.json(val)
  } catch(err){
    next(err)
  }
}

export const getVoteCount = async (req: Request, res: Response, next: Function) => {
  const {id} = req.params;
  try {
    let votesArr = await Votes.findAll({where: {
      topicid: id
    }});
    let count = 0;
    votesArr.map((votesObj: any) => {
      count = count + votesObj.dataValues.value
    })
    res.json({votes: count})
  } catch (err) {
    next(err)
  }
}

export const voteTopic = async (req: Request, res: Response, next: Function) => {
  try {
    let { topicid, userid, value } = req.body;
    let dupCheck = await Votes.findOne({where: {
      [Op.and]: [{ topicid: topicid }, { userid: userid }]}})
    if(dupCheck){
      if(dupCheck.value === value){
        res.status(409)
      } else {
        dupCheck.update({value: value}, {
            where: {userid: userid, topicid: topicid}
          })
      }
    } else {
      const dbVote = await Votes.create({
        topicid,
        userid,
        value: value
      });
      res.json(dbVote)
    }
  } catch(err){
    next(err)
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