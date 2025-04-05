import express from "express";
import {
  getWishlist,
  addToWishlist,
  sendWishlist,
  deleteFromWishlist,
  clearWishlist,
} from "../controllers/wishListController.js";
import verifyJWT from "../middleware/verifyJWT.js";

const router = express.Router();

router.use(verifyJWT as express.RequestHandler);

router.get("/", getWishlist);

router.post("/", addToWishlist);

router.post("/send-wishlist", sendWishlist);
router.delete("/", deleteFromWishlist);

router.delete("/clear-wishlist", clearWishlist);

export default router;
