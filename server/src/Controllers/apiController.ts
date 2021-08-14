require('dotenv').config();
import { Response, Request } from 'express';
const { Region } = require('../Models/region.model');


export const getRegions = async (req: Request, res: Response, next: Function) => {
  try {
    const regions = await Region.findAll({});
    res.json(regions);
  } catch (err) {
    next(err);
  }
};