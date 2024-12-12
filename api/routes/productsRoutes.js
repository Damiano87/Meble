import express from "express";
import productsController from "../controllers/productsController.js";

const router = express.Router();

router.route("/top-eight").get(productsController.getTopLikedProducts);
//   .post(vehicleController.createAtv)
//   .patch(vehicleController.updateAtv)
//   .delete(vehicleController.deleteAtv);

router.route("/trendy").get(productsController.getTrendyProducts);
// router.route("/:id").get(vehicleController.getSingleAtv);

export default router;
