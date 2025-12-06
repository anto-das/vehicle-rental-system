import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from ".";
const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        res.status(401).send({
          success: false,
          message: "unauthorized access",
        });
      }
      const decoded = jwt.verify(
        token as string,
        config.jwt_secret_token as string
      ) as JwtPayload;
      req.user = decoded;
      if (roles.length && !roles.includes(decoded.role)) {
        res.status(403).send({
          success: false,
          message: "forbidden access",
        });
      }
      next();
    } catch (err: any) {
      res.status(500).send({
        success: false,
        message: err.message,
      });
    }
  };
};

export default auth;
