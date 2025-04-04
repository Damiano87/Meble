import { Request, Response } from "express";
import { logEvents } from "./logger.js";

interface ErrorWithStack extends Error {
  stack?: string;
}

const errorHandler = (err: ErrorWithStack, req: Request, res: Response) => {
  logEvents(
    `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
    "errLog.log"
  );

  console.log(err.stack);

  const status = res.statusCode ? res.statusCode : 500; // server error

  res.status(status);

  res.json({ message: err.message });

  // next();
};

export default errorHandler;
