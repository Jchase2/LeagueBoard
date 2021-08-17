require('dotenv').config();
import { Response, Request } from 'express';
const { Region } = require('../Models/region.model');
const { Topic } = require('../Models/topic.model');



export const getRegions = async (req: Request, res: Response, next: Function) => {
  try {
    const regions = await Region.findAll({});
    res.json(regions);
  } catch (err) {
    next(err);
  }
};

export const getForumTopics = async (req: Request, res: Response, next: Function) => {
  try {
    const topics = await Topic.findAll({});
    res.json(topics);
  } catch (err) {
    next(err);
  }
};

export const postForumTopic = async (req: Request, res: Response, next: Function) => {
  try {
    const topics = await Topic.create({
      title: req.body.title,
      text: req.body.text,
      userid: req.body.userid,
      parentid: req.body?.parentid,
      closed: false,
    })
    res.status(201);
    res.json(topics);
  } catch (err) {
    next(err);
  }
};