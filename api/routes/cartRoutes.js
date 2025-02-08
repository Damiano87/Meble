import express from "express";
import cartController from "../controllers/cartController.js";
import verifyJWT from "../middleware/verifyJWT.js";

const router = express.Router();

router.post("/:productId/add-to-cart", verifyJWT, cartController.addToCart);
router.patch(
  "/update-quantity/:cartItemId",
  verifyJWT,
  cartController.updateCartItemQuantity
);
router.delete(
  "/remove-from-cart/:cartItemId",
  verifyJWT,
  cartController.deleteCartItem
);
router.get("/cart-items", verifyJWT, cartController.getCartItems);

export default router;
