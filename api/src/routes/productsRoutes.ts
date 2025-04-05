import express from "express";
import {
  getProducts,
  getTopLikedProducts,
  getTrendyProducts,
  getSingleProduct,
} from "../controllers/productsController.js";

const router = express.Router();

router.route("/").get(getProducts);

router.route("/top-eight").get(getTopLikedProducts);

router.route("/trendy").get(getTrendyProducts);

router.route("/:id").get(getSingleProduct);

export default router;
