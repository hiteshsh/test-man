import express from "express";

import { addUser, getUsers } from "../controllers/users.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/user", addUser);

export default router;
