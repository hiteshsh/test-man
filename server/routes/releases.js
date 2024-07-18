import express from "express";

import {
  getReleases,
  createRelease,
  deleteReleaseById,
  getReleasesById,
  updateReleaseById,
  updateTestCaseResult,
} from "../controllers/releases.js";

import { authorize } from "../middleware/verifyJWT.js";

const router = express.Router();

router.get(
  "/releases",
  authorize([{ resource: "release", action: "view" }]),
  getReleases
);
router.get("/release/:releaseId", authorize([{ resource: "release", action: "view" }]), getReleasesById);
router.post("/release",authorize([{ resource: "release", action: "addEdit" }]), createRelease);
router.delete("/release/:releaseId",authorize([{ resource: "release", action: "delete" }]), deleteReleaseById);
router.put("/release/:releaseId",authorize([{ resource: "release", action: "addEdit" }]), updateReleaseById);
router.put("/release/:releaseId/testcase/:testCaseId",authorize([{ resource: "release", action: "addEdit" }]), updateTestCaseResult);

export default router;
