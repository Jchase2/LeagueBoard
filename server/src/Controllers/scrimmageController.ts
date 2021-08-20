import { Response, Request } from "express";
const { Scrimmages } = require("../Models/scrimmage.model");

export const getAllScrimmages = async (req: Request, res: Response, next: Function) => {
  try {
    const scrimmages = await Scrimmages.findAll({});
    res.json(scrimmages);
  } catch (err) {
    next(err);
  }
}

export const getScrimmage = async (req: Request, res: Response, next: Function) => {
  try {
    const id = req.params.id;
    const scrimmages = await Scrimmages.findAll({where: {id: id}});
    res.json(scrimmages);
  } catch (err) {
    next(err);
  }
}

export const postScrimmage = async (req: Request, res: Response, next: Function) => {
  try {
    const { userid, team_name1, date
      , team_name2, player1, player2, player3, player4, player5
      , player6, player7, player8, player9, player10
      , bo5, bo3, bo1 } = req.body;

    const scrimmage = await Scrimmages.create({
      userid_posted: userid,
      team_name1: team_name1,
      team_name2: team_name2,
      player10: player10,
      player9: player9,
      player8: player8,
      player7: player7,
      player6: player6,
      player5: player5,
      player4: player4,
      player3: player3,
      player2: player2,
      player1: player1,
      bo5: bo5,
      bo3: bo3,
      bo1: bo1,
      date: date
    });

    res.status(201);
    res.json(scrimmage);
  } catch (err) {
    next(err);
  }
}