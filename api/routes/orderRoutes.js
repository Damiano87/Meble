import express from "express";
import orderController from "../controllers/orderController.js";
import verifyJWT from "../middleware/verifyJWT.js";

const router = express.Router();
router.use(verifyJWT);

router.route("/").get(orderController.getOrderDetails);
router.route("/").post(orderController.createOrder);

export default router;
