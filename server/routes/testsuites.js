import express from "express";

import {
  createTestSuite,
  deleteTestSuiteById,
  getTestSuites,
  updateTestSuiteById,
} from "../controllers/testsuites.js";

const router = express.Router();

router.get("/testsuites", getTestSuites);
router.post("/testsuite", createTestSuite);
router.delete("/testsuite/:testsuiteId", deleteTestSuiteById);
router.put("/testsuite/:testsuiteId", updateTestSuiteById);

export default router;
