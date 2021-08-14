import { Response, Request } from 'express';
import { Region } from '../Models/region.model';
import { User } from '../Models/user.model';
import { getSummonerByNameAndRegion } from './utils';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


export const register = async (req: Request, res: Response, next: Function) => {
  try {
    let { email, password, regionid, summonerName, puuid } = req.body;

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    const user = await User.create({
      email, password, regionid, summonerName, puuid
    });


    sendToken(user, 201, res);
  } catch (error) {
    next(error);
  }
}

export const verify = async (req: Request, res: Response, next: Function) => {
  try {
    let { regionid, summonerName } = req.body;

    //check regionId in db
    const region : any = await Region.findOne({ where: { id: regionid }, attributes: ['code'] });
    let regionName = region.dataValues.code;
    if (!region) {
      return res.status(404).send({
        message: 'RegionId not found',
        errorCode: 1
      });
    }
    //create api call to return iconId
    const summoner = await getSummonerByNameAndRegion(summonerName, regionName);
    if (!summoner) {
      return res.status(404).send({
        message: 'summoner not found',
        errorCode: 2
      });
    }

    res.send({
      icondid: summoner.profileIconId,
      puuid: summoner.puuid
    });
  } catch (error) {
    next(error);
  }
}

export const login = async (req: Request, res: Response, next: Function) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new Error('email or password missing'));
  }

  try {
    const user = await User.findOne({ where: { email: email }, attributes: ['password'] });

    if (!user) {
      return next(new Error('Invalid email or password'));
    }

    const isValid = await comparePasswords(password, user.password);
    if (!isValid) {
      return next(new Error('Invalid email or password'));
    }

    sendToken(user, 200, res);
  } catch (error) {
    next(error);
  }
}

interface IUser {
  email: string;
}

const sendToken = (user: IUser, statusCode: number, res: Response) => {
  const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
  res.status(statusCode).json({ success: true, token });
}

function comparePasswords(candidatePassword: string, userPassword: string) {
  return bcrypt.compare(candidatePassword, userPassword);
}