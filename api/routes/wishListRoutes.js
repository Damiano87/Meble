import express from "express";
import wishListController from "../controllers/wishListController.js";
import verifyJWT from "../middleware/verifyJWT.js";

const router = express.Router();

router.use(verifyJWT);

router.get("/", wishListController.getWishlist);

router.post("/", wishListController.addToWishlist);

router.delete("/", wishListController.deleteFromWishlist);

export default router;
