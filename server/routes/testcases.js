import express from "express";

import {
  getTestCases,
  createTestCase,
  getTestCaseById,
  deleteTestCaseById,
  updateTestCaseById,
  validate,
} from "../controllers/testcases.js";
import { authorize } from "../middleware/verifyJWT.js";

const router = express.Router();

router.get(
  "/testcases",
  authorize([{ resource: "testCase", action: "view" }]),
  getTestCases
);
router.post(
  "/testcase",
  authorize([{ resource: "testCase", action: "addEdit" }]),
  createTestCase
);
router.get(
  "/testcase/:testcaseId",
  authorize([{ resource: "testCase", action: "view" }]),
  getTestCaseById
);
router.delete(
  "/testcase/:testcaseId",
  authorize([{ resource: "testCase", action: "addEdit" }]),
  deleteTestCaseById
);
router.put(
  "/testcase/:testcaseId",
  validate("createTestCase"),
  authorize([{ resource: "testCase", action: "delete" }]),
  updateTestCaseById
);

export default router;
