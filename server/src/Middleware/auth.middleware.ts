import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import assert from "http-assert";
import { User } from "../Models/user.model";

interface AuthRequest extends Request {
  user?: any;
}

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: Function
) => {
  let token = "";

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  assert(!token, 401, "Unauthorized");

  try {
    const secret: any = process.env.JWT_SECRET;
    const decoded: any = jwt.verify(token, secret);
    const user = await User.findOne({ where: { id: decoded.id } });
    assert(!user, 404, "Not Found");
    req.user = user;
    next();
  } catch (error) {
    assert(error, 401, "Unauthorized");
  }
};
