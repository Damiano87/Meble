import express from "express";
import wishListController from "../controllers/wishListController.js";
import verifyJWT from "../middleware/verifyJWT.js";

const router = express.Router();

router.get("/", wishListController.getWishlist);

router.post("/", verifyJWT, wishListController.addToWishlist);

router.delete("/", verifyJWT, wishListController.deleteFromWishlist);

export default router;
