import { NextFunction, Request, Response } from "express";
import User, { UserInterface } from "../models/User";
import jwt from "jsonwebtoken";

type Decode = {
  id: string;
  iat: Date;
  exp: Date;
};

export interface AuthRequest extends Request {
  user?: UserInterface | null;
}

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET!);
      req.user = await User.findById((decoded as unknown as Decode).id).select(
        "-password"
      );
      next();
    } catch (error) {
      res.status(400).json({ error });
    }
  }

  if (!token) {
    res.status(401).send("權限不足");
  }
};

export const admin = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user && req.user?.isAdmin) {
    next();
  } else {
    res.status(401).send("權限不足");
  }
};
