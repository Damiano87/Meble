import express, { Request, Response } from "express";
const router = express.Router();
import path from "path";
import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// router.get("^/$|/index(.html)?", (req, res) => {
//   res.sendFile(path.join(__dirname, "..", "views", "index.html"));
// });

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "API działa poprawnie" });
});

export default router;
