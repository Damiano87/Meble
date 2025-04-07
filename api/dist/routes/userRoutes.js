import express from "express";
import { getAllUsers, createUser, updateUser, deleteUser, getUser, updateUserInfoForDelivery, updateUserPassword, } from "../controllers/usersController.js";
import verifyJWT from "../middleware/verifyJWT.js";
const router = express.Router();
router.use(verifyJWT);
router
    .route("/")
    .get(getAllUsers)
    .post(createUser)
    .patch(updateUser)
    .delete(deleteUser);
router.get("/user", getUser);
router.patch("/delivery", updateUserInfoForDelivery);
router.patch("/password", updateUserPassword);
export default router;
