import express from "express";

import { addRole, deleteRoleById, getRoles } from "../controllers/roles.js";

const router = express.Router();

router.get("/", getRoles);
router.post("/role", addRole);
router.delete("/role/:id", deleteRoleById);

export default router;
