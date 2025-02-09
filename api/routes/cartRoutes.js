import express from "express";
import cartController from "../controllers/cartController.js";
import verifyJWT from "../middleware/verifyJWT.js";

const router = express.Router();

router.use(verifyJWT);

router.post("/:productId/add-to-cart", cartController.addToCart);
router.patch(
  "/update-quantity/:cartItemId",

  cartController.updateCartItemQuantity
);
router.delete("/remove-from-cart/:cartItemId", cartController.deleteCartItem);
router.delete("/remove-all", cartController.deleteAllCartItems);
router.get("/cart-items", cartController.getCartItems);

export default router;
