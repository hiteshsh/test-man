import express from "express";

import {
  addUser,
  deleteUserById,
  getMyUser,
  getUserById,
  getUsers,
  updateApplicationState,
  updateUserById,
} from "../controllers/users.js";
import { authorize } from "../middleware/verifyJWT.js";

const router = express.Router();

router.get("/", authorize([{ resource: "user", action: "view" }]), getUsers);
router.post(
  "/user",
  authorize([{ resource: "user", action: "view" }]),
  addUser
);
router.put(
  "/user/:userId",
  authorize([{ resource: "user", action: "view" }]),
  updateUserById
);
router.get(
  "/user/:userId",
  authorize([{ resource: "user", action: "view" }]),
  getUserById
);
router.delete(
  "/user/:userId",
  authorize([{ resource: "user", action: "view" }]),
  deleteUserById
);
router.post("/user/application-state", updateApplicationState);
router.get("/me", getMyUser);

export default router;
