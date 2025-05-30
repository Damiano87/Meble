import express from "express";
import {
  getUserOrders,
  getOrderDetails,
  createOrder,
  cancellOrder,
} from "../controllers/orderController.js";
import verifyJWT from "../middleware/verifyJWT.js";

const router = express.Router();
router.use(verifyJWT as express.RequestHandler);

router.route("/").get(getUserOrders);
router.route("/order/:orderId").get(getOrderDetails);
router.route("/").post(createOrder);
router.route("/cancell-order").patch(cancellOrder);

export default router;
