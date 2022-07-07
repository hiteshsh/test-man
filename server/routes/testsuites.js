import express from "express";

import {
  createTestSuite,
  deleteTestSuiteById,
  getTestSuites,
} from "../controllers/testsuites.js";

const router = express.Router();

router.get("/project/:projectId/testsuites", getTestSuites);
router.post("/testsuite", createTestSuite);
router.delete("/testsuite/:testsuiteId", deleteTestSuiteById);
//router.put("/testsuite/:testsuiteId", updateTestCaseById);

export default router;
