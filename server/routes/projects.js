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

router.get("/projects",authorize([{ resource: "project", action: "view" }]), getProjects);
router.post("/project", authorize([{ resource: "release", action: "addEdit" }]),validate("createProject"), createProject);
router.delete("/project/:projectId", authorize([{ resource: "release", action: "delete" }]),deleteProjectById);
router.put("/project/:projectId",authorize([{ resource: "release", action: "addEdit" }]), updateProjectById);

export default router;
