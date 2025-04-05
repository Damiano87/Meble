import { format } from "date-fns";
import { v4 } from "uuid";
import fs from "fs";
import fsPromises from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { NextFunction, Request, Response } from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logEvents = async (message: string, logFileName: string) => {
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${message}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.promises.mkdir(path.join(__dirname, "..", "logs"));
    }
    await fsPromises.promises.appendFile(
      path.join(__dirname, "..", "logs", logFileName),
      logItem
    );
  } catch (error) {
    console.log(error);
  }
};

const logger = (req: Request, res: Response, next: NextFunction) => {
  logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, "reqLog.log");

  console.log(`${req.method} ${req.path}`);

  next();
};

export { logEvents, logger };

// \t${uuid()}
