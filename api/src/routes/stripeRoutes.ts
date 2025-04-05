import express from "express";
import { handler, verifyPayment } from "../controllers/stripeController.js";
import verifyJWT from "../middleware/verifyJWT.js";

const router = express.Router();

router.post(
  "/api/create-checkout-session",
  verifyJWT as express.RequestHandler,
  handler
);
router.get("/api/verify-payment", verifyPayment);
export default router;
