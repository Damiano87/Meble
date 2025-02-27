import express from "express";
import usersController from "../controllers/usersController.js";
import verifyJWT from "../middleware/verifyJWT.js";

const router = express.Router();
router.use(verifyJWT);

router
  .route("/")
  .get(usersController.getAllUsers)
  .post(usersController.createUser)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser);
router.patch("/delivery", usersController.updateUserInfoForDelivery);

export default router;
