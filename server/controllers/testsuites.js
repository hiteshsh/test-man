import TestSuite from "../models/testsuite.js";
import Section from "../models/section.js";

export const getTestSuites = async (req, res) => {
  try {
    let projectId = req.query.projectId;
    const query = { projectId: projectId };

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
    const testSuites = await TestSuite.find(query)
      .limit(limit)
      .skip(limit * page)
      .lean()
      .exec();

    let newSuites = [];

    for (const suite of testSuites) {
      const query1 = { testSuiteId: suite._id };
      const sections = await getSections(query1);
      suite["sections"] = sections;
      newSuites.push(suite);
    }

    res.status(200).json(newSuites);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

async function getSections(query1) {
  const sections = await Section.find(query1);
  return sections;
}

export const createTestSuite = async (req, res) => {
  const newTestSuite = new TestSuite({
    name: req.body.name,
    description: req.body.description,
    projectId: req.body.projectId,
  });
  try {
    await newTestSuite.save();
    res.status(200).json(newTestSuite);
  } catch (error) {
    res.status(409).json(error.message);
  }
};

export const updateTestSuiteById = async (req, res) => {
  const { testsuiteId } = req.params;
  const { name, description } = req.body;

  try {
    const updatedTestSuite = await TestSuite.findByIdAndUpdate(
      testsuiteId,
      { name, description },
      { new: true, runValidators: true }
    );
    if (!updatedTestSuite) {
      return res.status(404).json({ message: "Test Suite not found" });
    }

    res.status(200).json(updatedTestSuite);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTestSuiteById = async (req, res) => {
  const { testsuiteId } = req.params;

  try {
    const deleteTestSuite = await TestSuite.findByIdAndDelete(testsuiteId);

    if (!deleteTestSuite) {
      return res.status(404).json({ message: "Test suite not found" });
    }
    res.status(200).json(deleteTestSuite);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
