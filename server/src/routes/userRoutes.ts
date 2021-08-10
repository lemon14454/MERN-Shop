import express from "express";
import { admin, protect } from "../middleware/auth";
import {
  deleteUser,
  getUserById,
  getUserProfile,
  getUsers,
  login,
  register,
  updateUser,
  updateUserProfile,
} from "../controllers/userController";

const router = express.Router();

router.route("/").get(protect, admin, getUsers);
router.post("/login", login);
router.post("/register", register);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

export default router;
