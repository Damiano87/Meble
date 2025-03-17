import express from "express";
import productsController from "../controllers/productsController.js";

const router = express.Router();

router.route("/").get(productsController.getProducts);

router.route("/top-eight").get(productsController.getTopLikedProducts);

router.route("/trendy").get(productsController.getTrendyProducts);

router.route("/:id").get(productsController.getSingleProduct);

export default router;
