import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

// Rozszerzamy interfejs Request, aby zawierał nasze własne pola
declare module "express" {
  interface Request {
    user?: string;
    roles?: string[];
    userId?: string;
  }
}

// Definiujemy interfejs dla naszych danych JWT
interface UserJwtPayload {
  UserInfo: {
    username: string;
    roles: string[];
    id: string;
  };
}

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization || req.headers["authorization"];

  // Sprawdzamy, czy authHeader jest stringiem
  if (
    !authHeader ||
    typeof authHeader !== "string" ||
    !authHeader.startsWith("Bearer ")
  ) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  // Sprawdzamy, czy SECRET istnieje
  const secret = process.env.ACCESS_TOKEN_SECRET;
  if (!secret) {
    console.error("ACCESS_TOKEN_SECRET not set in environment");
    return res.status(500).json({ message: "Server configuration error" });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Forbidden" });

    // Używamy typowania dla decoded
    const decodedUser = decoded as UserJwtPayload;

    req.user = decodedUser?.UserInfo?.username;
    req.roles = decodedUser?.UserInfo?.roles;
    req.userId = decodedUser?.UserInfo?.id;
    next();
  });
};

export default verifyJWT;
