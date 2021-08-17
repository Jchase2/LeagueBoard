import { Response, Request } from "express";
import { Region } from "../Models/region.model";
import { User } from "../Models/user.model";
import { sequelize } from '../Models/index'
import { getSummonerByNameAndRegion, getSummonerByPuuid } from "./utils";

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

export const verifyEmailAndUser = async (req: Request, res: Response, next: Function) => {
  const { regionid, summoner_name, email } = req.headers;

  let query: any = await sequelize.query(`SELECT id FROM public."Users" as U 
  WHERE email = '${email}' OR (summoner_name = '${summoner_name}' AND regionid = '${regionid}');`);

  if (query[0][0] === undefined) {
    res.status(200).send();
  } else {
    res.status(409).send({
      message: "Summoner or email already exists.",
    });
  }
}

export const register = async (req: Request, res: Response, next: Function) => {
  try {
    let { email, password, regionid, summoner_name, puuid, iconid } = req.body;

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    const user = await User.create({
      email,
      password,
      regionid,
      summoner_name,
      puuid,
      iconid,
    });

    sendToken(user, 201, res);

  } catch (error) {
    next(error);
  }
};

export const verify = async (req: Request, res: Response, next: Function) => {
  try {
    let { regionId, summoner_name } = req.body;
    //check regionId in db
    const region: any = await Region.findOne({
      where: { id: regionId },
      attributes: ["code"],
    });
    let regionName = region.dataValues.code;
    if (!region) {
      return res.status(404).send({
        message: "RegionId not found",
        errorCode: 1,
      });
    }
    //create api call to return iconId
    const summoner = await getSummonerByNameAndRegion(summoner_name, regionName);
    if (!summoner) {
      return res.status(404).send({
        message: "summoner not found",
        errorCode: 2,
      });
    }

    res.send({
      iconid: summoner.profileIconId,
      puuid: summoner.puuid,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: Function) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new Error("email or password missing"));
  }

  try {
    let user: any = await User.findOne({
      where: { email: email },
    });

    if (!user) {
      return next(new Error("Invalid email or password"));
    }

    const isValid = await comparePasswords(password, user.password);
    if (!isValid) {
      return next(new Error("Invalid email or password"));
    }

    user.password = "";
    sendToken(user, 200, res);
  } catch (error) {
    next(error);
  }
};

const sendToken = (user: any, statusCode: number, res: Response) => {
  const token = jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  res.status(statusCode).json({ success: true, token });
};

function comparePasswords(candidatePassword: string, userPassword: string) {
  return bcrypt.compare(candidatePassword, userPassword);
}
