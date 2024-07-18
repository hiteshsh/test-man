import express from "express";

import {
  addUser,
  deleteUserById,
  getUserById,
  getUsers,
  updateUserById,
} from "../controllers/users.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/user", addUser);
router.put("/user/:userId", updateUserById);
router.get("/user/:userId", getUserById);
router.delete("/user/:userId", deleteUserById);

export default router;
