import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, "your_jwt_secret", (err, decoded: any) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    (req as any).user = decoded;
    next();
  });
};
