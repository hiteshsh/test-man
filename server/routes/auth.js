import express from "express";

import { loginUser, logoutUser, refreshToken } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", loginUser);
router.get("/refresh", refreshToken);
router.get("/logout", logoutUser);

export default router;
