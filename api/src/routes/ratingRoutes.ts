import express from "express";
import {
  rateProduct,
  getProductRaters,
  getProductRatings,
  getUserRating,
  deleteRating,
} from "../controllers/ratingController.js";
import verifyJWT from "../middleware/verifyJWT.js";
const router = express.Router();

router.post(
  "/products/:productId/rate",
  verifyJWT as express.RequestHandler,
  rateProduct
);
router.get("/products/:productId/ratings", getProductRatings);
router.get("/products/:productId/raters", getProductRaters);
router.get("/products/:productId/my-rating", getUserRating);
router.delete(
  "/products/:productId/rate",
  verifyJWT as express.RequestHandler,
  deleteRating
);

export default router;
