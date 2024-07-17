import Release from "../models/release.js";
import { getTestCases } from "./testcases.js";
import TestCase from "../models/testcase.js";

export const getReleases = async (req, res) => {
  try {
    let limit =
      req.query.limit && req.query.limit <= 25 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
      if (req.query.page) {
        req.query.page = parseInt(req.query.page);
        page = Number.isInteger(req.query.page) ? req.query.page : 0;
      }
    }
    const releases = await Release.find()
      .limit(limit)
      .skip(limit * page);

    res.status(200).json(releases);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getReleasesById = async (req, res) => {
  try {
    console.log("Get project", req.params.releaseId);
    const getRelease = await Release.findOne({
      _id: req.params.releaseId,
    });

    res.status(200).json(getRelease);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createRelease = async (req, res) => {
  const {
    name,
    description,
    status,
    projectId,
    testCaseInclusionType,
    testCases,
  } = req.body;

  const query = {};

  let testExecutions = [];

  if (testCaseInclusionType === "all") {
    try {
      if (projectId) {
        query.projectId = projectId;
      }
      const allTestCases = await TestCase.find(query);
      testExecutions = allTestCases.map((testCase) => ({
        testCase: testCase._id,
        results: [{ result: "untested" }],
      }));
    } catch (error) {
      return res.status(500).send(error);
    }
  } else if (testCaseInclusionType === "specific" && Array.isArray(testCases)) {
    testExecutions = testCases.map((testCaseId) => ({
      testCase: testCaseId,
      results: [{ result: "untested" }],
    }));
  }
  const newRelease = new Release({
    name,
    description,
    status,
    projectId,
    testCaseInclusionType,
    testExecutions,
  });

  try {
    //console.log("before save", newRelease);
    await newRelease.save();
    res.status(200).json(newRelease);
  } catch (error) {
    res.status(409).json(error.message);
  }
};

export const deleteReleaseById = async (req, res) => {
  try {
    console.log("deleting project", req.params.releaseId);
    const removedRelease = await Release.deleteOne({
      _id: req.params.releaseId,
    });

    res.status(200).json(removedRelease);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateReleaseById = async (req, res) => {
  const { releaseId } = req.params;
  const {
    name,
    description,
    status,
    projectId,
    testCaseInclusionType,
    testCases,
  } = req.body;

  const query = {};

  let testExecutions = [];

  if (testCaseInclusionType === "all") {
    try {
      if (projectId) {
        query.projectId = projectId;
      }
      const allTestCases = await TestCase.find(query);
      testExecutions = allTestCases.map((testCase) => ({
        testCase: testCase._id,
        results: [{ result: "untested" }],
      }));
    } catch (error) {
      return res.status(500).send(error);
    }
  } else if (testCaseInclusionType === "specific" && Array.isArray(testCases)) {
    testExecutions = testCases.map((testCaseId) => ({
      testCase: testCaseId,
      results: [{ result: "untested" }],
    }));
  }

  try {
    const updatedRelease = await Release.findByIdAndUpdate(
      releaseId,
      {
        name,
        description,
        status,
        testCaseInclusionType,
        testExecutions,
      },
      { new: true, runValidators: true }
    );
    if (!updatedRelease) {
      return res.status(404).json({ message: "Test Release not found" });
    }

    res.status(200).json(updatedRelease);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTestCaseResult = async (req, res) => {
  const { releaseId, testCaseId } = req.params;
  const { result } = req.body;
  try {
    const release = await Release.findById(releaseId);
    if (!release) {
      return res.status(404).json({error:'Release not found'});
    }

    const testExecution = release.testExecutions.find(te => te.testCase.toString() === testCaseId);
    if (!testExecution) {
      return res.status(404).json({error:'Test case not found in release'});
    }
    testExecution.results.push({ result });
    await release.save();

    res.status(200).json(release);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};
