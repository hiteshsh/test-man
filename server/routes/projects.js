import express from "express";

import {
  getProjects,
  createProject,
  validate,
  deleteProjectById,
} from "../controllers/Projects.js";

const router = express.Router();

router.get("/projects", getProjects);
router.post("/project", validate("createProject"), createProject);
router.delete("/project/:projectId", deleteProjectById);
//router.put("/project", updateProjectById);

export default router;
