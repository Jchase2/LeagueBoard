import express, { Response } from "express";

require('dotenv').config();
const crypto = require('crypto');
const { User } = require('../Models/user.model');
const jwt = require('jsonwebtoken');

exports.register = async (req: express.Request, res: express.Response, next: Function) => {
  try {
    const { username, email, password } = req.body;

    const user = await User.create({
      username, email, password
    });

    sendToken(user, 201, res);
  } catch (error) {
    next(error);
  }

}

exports.login = async (req: express.Request, res: express.Response, next: Function) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new Error('email or password missing'));
  }

  try {
    const user = await User.findOne({ where:{ 
      email: email,
      password: password
    }});

    if (!user) {
      return next(new Error('Invalid email or password'));
    }

    const isValid = await user.comparePasswords(password);
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

const sendToken = (user: IUser, statusCode : number, res: Response) => {
  const token = jwt.sign({email: user.email}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
  res.status(statusCode).json({ success: true, token });
}