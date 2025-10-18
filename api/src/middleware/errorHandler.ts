import { NextFunction, Request, Response } from "express";
import { logEvents } from "./logger.js";

interface ErrorWithStack extends Error {
  stack?: string;
}

const errorHandler = (
  err: ErrorWithStack,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logEvents(
    `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
    "errLog.log"
  );

  console.log(err.stack);

  // Set CORS headers
  const allowedOrigins = ["https://h-furniture-store.onrender.com"];
  const origin = req.headers.origin;

  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
  }

  const status = res.statusCode ? res.statusCode : 500; // server error

  res.status(status);

  res.json({ message: err.message });
};

export default errorHandler;
