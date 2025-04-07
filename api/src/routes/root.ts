import express, { Request, Response } from "express";
const router = express.Router();
import path from "path";
import { fileURLToPath } from "url";

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "API działa poprawnie" });
});

export default router;
