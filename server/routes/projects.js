import express from "express";

import {
  getProjects,
  createProject,
  validate,
} from "../controllers/Projects.js";

const router = express.Router();

router.get("/projects", getProjects);
router.post("/project", validate("createProject"), createProject);

export default router;
