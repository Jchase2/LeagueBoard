import { Request, Response } from "express";

const jwt = require('jsonwebtoken');
import { User } from '../Models/user.model';
const errorResponse = require('../utils/errorResponse');

interface AuthRequest extends Request {
  user?: any;
}


export const protect = async (req: AuthRequest, res: Response, next: Function) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new errorResponse('Unauthorized', 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ where: { id: decoded.id } });
    
    if (!user) {
      return next(new errorResponse('Not found', 404));
    }
    req.user = user;
    next();
  } catch (error) {
    return next(new errorResponse('Unauthorized', 401));
  }
}