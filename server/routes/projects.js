import express from "express";

import {
  getProjects,
  createProject,
  validate,
  deleteProjectById,
  updateProjectById,
} from "../controllers/Projects.js";
import { authorize } from "../middleware/verifyJWT.js";

const router = express.Router();

router.get(
  "/projects",
  authorize([{ resource: "project", action: "view" }]),
  getProjects
);
router.post(
  "/project",
  authorize([{ resource: "project", action: "addEdit" }]),
  validate("createProject"),
  createProject
);
router.delete(
  "/project/:projectId",
  authorize([{ resource: "project", action: "delete" }]),
  deleteProjectById
);
router.put(
  "/project/:projectId",
  authorize([{ resource: "project", action: "addEdit" }]),
  updateProjectById
);

export default router;
