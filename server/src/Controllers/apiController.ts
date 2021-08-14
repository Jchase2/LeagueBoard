import express, { Response, Request } from 'express';



require('dotenv').config();
const crypto = require('crypto');
const { User } = require('../Models/user.model');
const jwt = require('jsonwebtoken');

exports.test = async (req: Request, res: Response, next: Function) => {

 
}