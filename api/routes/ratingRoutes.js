import express from "express";
import ratingController from "../controllers/ratingController.js";
import verifyJWT from "../middleware/verifyJWT.js";
const router = express.Router();

router.post(
  "/products/:productId/rate",
  verifyJWT,
  ratingController.rateProduct
);
router.get("/products/:productId/ratings", ratingController.getProductRatings);
router.get("/products/:productId/raters", ratingController.getProductRaters);
router.get("/products/:productId/my-rating", ratingController.getUserRating);
router.delete(
  "/products/:productId/rate",
  verifyJWT,
  ratingController.deleteRating
);

export default router;
