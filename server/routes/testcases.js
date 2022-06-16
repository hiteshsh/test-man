import express from "express";

import {
  getTestCases,
  createTestCase,
  getTestCaseById,
  deleteTestCaseById,
  updateTestCaseById,
  validate
} from "../controllers/testcases.js";

const router = express.Router();

router.get("/", getTestCases);
router.post("/testcase", validate("createTestCase"),createTestCase);
router.get("/testcase/:testcaseId", getTestCaseById);
router.delete("/testcase/:testcaseId", deleteTestCaseById);
router.put("/testcase/:testcaseId", validate("createTestCase"),updateTestCaseById);

export default router;
