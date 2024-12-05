import express from "express";
import usersController from "../controllers/usersController.js";

const router = express.Router();

router
  .route("/")
  .get(usersController.getAllUsers)
  .post(usersController.createUser)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser);

export default router;
