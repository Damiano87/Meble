import express from "express";
import stripeController from "../controllers/stripeController.js";
import verifyJWT from "../middleware/verifyJWT.js";

const router = express.Router();

router.post("/api/create-checkout-session", stripeController.handler);

export default router;
