import express from "express";

import {
  getReleases,
  createRelease,
  deleteReleaseById,
  getReleasesById,
  updateReleaseById,
} from "../controllers/releases.js";

const router = express.Router();

router.get("/releases", getReleases);
router.get("/release/:releaseId", getReleasesById);
router.post("/release", createRelease);
router.delete("/release/:releaseId", deleteReleaseById);
router.put("/release/:releaseId", updateReleaseById);

export default router;
