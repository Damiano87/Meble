import express from "express";
import ratingController from "../controllers/ratingController.js";

const router = express.Router();

router.post("/products/:productId/rate", ratingController.rateProduct);
router.get("/products/:productId/ratings", ratingController.getProductRatings);
router.get("/products/:productId/my-rating", ratingController.getUserRating);
router.delete("/products/:productId/rate", ratingController.deleteRating);

export default router;
