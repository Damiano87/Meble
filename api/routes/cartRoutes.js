import express from "express";
import cartController from "../controllers/cartController.js";
import verifyJWT from "../middleware/verifyJWT.js";

const router = express.Router();

router.post("/:productId/add-to-cart", verifyJWT, cartController.addToCart);

export default router;
