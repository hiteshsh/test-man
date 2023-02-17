import express from "express";

import { loginUser, refreshToken } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", loginUser);
router.get("/refresh", refreshToken);

export default router;
