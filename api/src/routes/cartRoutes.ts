import express from "express";
import {
  addToCart,
  updateCartItemQuantity,
  deleteCartItem,
  deleteAllCartItems,
  getCartItems,
} from "../controllers/cartController.js";
import verifyJWT from "../middleware/verifyJWT.js";

const router = express.Router();

router.use(verifyJWT as express.RequestHandler);

router.post("/:productId/add-to-cart", addToCart);
router.patch(
  "/update-quantity/:cartItemId",

  updateCartItemQuantity
);
router.delete("/remove-from-cart/:cartItemId", deleteCartItem);
router.delete("/remove-all", deleteAllCartItems);
router.get("/cart-items", getCartItems);

export default router;
