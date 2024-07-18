import express from "express";

import {
  addRole,
  deleteRoleById,
  getRoleById,
  getRoles,
  updateRoleById,
} from "../controllers/roles.js";

const router = express.Router();

router.get("/", getRoles);
router.get("/role/:roleId", getRoleById);
router.post("/role", addRole);
router.put("/role/:roleId", updateRoleById);
router.delete("/role/:roleId", deleteRoleById);

export default router;
