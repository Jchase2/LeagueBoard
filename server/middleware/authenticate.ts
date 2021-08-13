import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import * as dotenv from 'dotenv'
dotenv.config();
//if secret then
/* const secret: any = process.env.JWT_SECRET; */

interface AuthRequest extends Request {
  user?: Document;
}

export const authenticate = async (req: AuthRequest, res: Response, next: any) => {
  try {
    const token = req.header('x-auth-token');

    let decodedData: any;
    if (token) {
      decodedData = jwt.verify(token, /* secret */);
      req.user = decodedData;
      next();
    } else {
      res.status(403).send({ message: 'No token, authorization denied.' });
    }

  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    res.sendStatus(403);
  }
};