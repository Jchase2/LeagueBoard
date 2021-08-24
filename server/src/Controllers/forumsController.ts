require("dotenv").config();
import { Response, Request } from "express";
import { Op } from "sequelize";
import { sequelize } from "../Models";
import { Topic } from "../Models/topic.model";
const { User } = require("../Models/user.model");
const { Votes } = require("../Models/vote.model");

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

export const closeForumTopic = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    let { topicid, state } = req.body;
    const topic = await Topic.findByPk(topicid);
    await topic!.update({ closed: state });
    res.json(topic);
  } catch (err) {
    next(err);
  }
};

export const getForumOwner = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    let { topicid } = req.params;
    const topic = await Topic.findByPk(topicid);
    const user = await User.findByPk(topic!.userid);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const deleteForumTopic = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    let { topicid } = req.params;
    let parentid = topicid;
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

    //console.log("QUERY: ", query)
    query[0].forEach(async (topic: any) => {
      let deleteMe: any = await Topic.findOne({ where: { id: topic.id } });
      deleteMe.destroy();
    });
    const topic = await Topic.findByPk(topicid);
    await topic!.destroy();
    res.json(topic);
    res.status(204);
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

export const getVote = async (req: Request, res: Response, next: Function) => {
  const { userid } = req.headers;
  const { id } = req.params;
  try {
    let val = await Votes.findOne({
      where: {
        [Op.and]: [{ topicid: id }, { userid: userid }],
      },
    });
    val = val.slice(0, 3);
    res.json(val);
  } catch (err) {
    next(err);
  }
};

export const getVoteCount = async (
  req: Request,
  res: Response,
  next: Function
) => {
  const { id } = req.params;
  try {
    let votesArr = await Votes.findAll({
      where: {
        topicid: id,
      },
    });
    let count = 0;
    votesArr.map((votesObj: any) => {
      count = count + votesObj.dataValues.value;
    });
    res.json({ votes: count });
  } catch (err) {
    next(err);
  }
};

export const voteTopic = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    let { topicid, userid, value } = req.body;
    let dupCheck = await Votes.findOne({
      where: {
        [Op.and]: [{ topicid: topicid }, { userid: userid }],
      },
    });
    if (dupCheck) {
      if (dupCheck.value === value) {
        res.status(409);
      } else {
        let resp = dupCheck.update(
          { value: value },
          {
            where: { userid: userid, topicid: topicid },
          }
        );
        res.json(resp);
      }
    } else {
      const dbVote = await Votes.create({
        topicid,
        userid,
        value: value,
      });
      res.json(dbVote);
    }
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

export const getParentId = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const { id } = req.params;
    let topic: any = await Topic.findByPk(id);
    if (topic.parentid <= 0) {
      return res.json(topic.id);
    }
    let parentid = topic.parentid;
    let lastParentId = -1;
    while (parentid && parentid > 0) {
      topic = await Topic.findByPk(topic.parentid);
      parentid = topic.parentid;
      lastParentId = topic.id;
    }
    res.json({ grandparent: lastParentId });
  } catch (err) {
    next(err);
  }
};
