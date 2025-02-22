import express from "express";
import wishListController from "../controllers/wishListController.js";
import verifyJWT from "../middleware/verifyJWT.js";

const router = express.Router();

router.use(verifyJWT);

router.get("/", wishListController.getWishlist);

router.post("/", wishListController.addToWishlist);

router.post("/send-wishlist", wishListController.sendWishlist);
router.delete("/", wishListController.deleteFromWishlist);

router.delete("/clear-wishlist", wishListController.clearWishlist);

export default router;
