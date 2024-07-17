import TestCase from "../models/testcase.js";
import { body, validationResult } from "express-validator";

export const getTestCases = async (req, res) => {
  try {
    const query = {};
    let sectionId = req.query.sectionId;
    let testsuiteId = req.query.testsuiteId;
    let projectId = req.query.projectId;

    if (sectionId) {
      query.sectionId = sectionId;
    }
    if (testsuiteId) {
      query.testsuiteId = testsuiteId;
    }
    if (projectId) {
      query.projectId = projectId;
    }

    let limit =
      req.query.limit && req.query.limit <= 100
        ? parseInt(req.query.limit)
        : 10;
    let page = 0;
    if (req.query) {
      if (req.query.page) {
        req.query.page = parseInt(req.query.page);
        page = Number.isInteger(req.query.page) ? req.query.page : 0;
      }
    }
    const testcases = await TestCase.find(query)
      .limit(limit)
      .skip(limit * page);
    res.status(200).json(testcases);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createTestCase = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  const testcase = req.body;
  console.log(testcase);
  const newTestCase = new TestCase({
    key: req.body.key,
    title: req.body.title,
    type: req.body.type,
    tags: req.body.tags,
    priority: req.body.priority,
    status: req.body.status,
    prerequisite: req.body.prerequisite,
    steps: req.body.steps,
    automated: req.body.automated,
    projectId: req.body.projectId,
    testsuiteId: req.body.testsuiteId,
    sectionId: req.body.sectionId,
  });

  try {
    await newTestCase.save();
    res.status(200).json(newTestCase);
  } catch (error) {
    res.status(409).json(error.message);
  }
};

export const getTestCaseById = async (req, res) => {
  try {
    const testcase = await TestCase.findById(req.params.testcaseId);

    res.status(200).json(testcase);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteTestCaseById = async (req, res) => {
  const { testcaseId } = req.params;

  try {
    const deleteTestCase = await TestCase.findByIdAndDelete(testcaseId);

    if (!deleteTestCase) {
      return res.status(404).json({ message: "Test case not found" });
    }
    res.status(200).json(deleteTestCase);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTestCaseById = async (req, res) => {
  const { testcaseId } = req.params;
  const {
    title,
    steps,
    type,
    tags,
    priority,
    status,
    prerequisite,
    automated,
    projectId,
    testsuiteId,
    sectionId,
  } = req.body;

  try {
    const updatedTestCase = await TestCase.findByIdAndUpdate(
      testcaseId,
      {
        title,
        steps,
        type,
        tags,
        priority,
        status,
        prerequisite,
        automated,
        projectId,
        testsuiteId,
        sectionId,
      },
      { new: true, runValidators: true }
    );
    if (!updatedTestCase) {
      return res.status(404).json({ message: "Test Case not found" });
    }

    res.status(200).json(updatedTestCase);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const validate = (method) => {
  switch (method) {
    case "createTestCase": {
      return [
        body("title", "Title cannot be empty").notEmpty(),
        body("description", "Description cannot be empty").notEmpty(),
        body("projectId", "Project cannot be empty").notEmpty(),
        //body("testSuiteId", "Test Suite cannot be empty").notEmpty(),
        //body("SectionId", "Section cannot be empty").notEmpty(),
        body("priority", "Priority allowed are High, Medium and Low").isIn([
          "High",
          "Medium",
          "Low",
        ]),
        body("status", "Status allowed are active, inactive").isIn([
          "active",
          "inactive",
        ]),
      ];
    }
  }
};
