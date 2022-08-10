import TestSuite from "../models/testSuite.js";
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
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   res.status(400).json({ errors: errors.array() });
  //   return;
  // }

  const newTestSuite = new TestSuite({
    name: req.body.name,
    description: req.body.description,
    creator: req.body.creator,
    status: req.body.status,
    projectId: req.body.projectId,
  });
  try {
    await newTestSuite.save();
    res.status(200).json(newTestSuite);
  } catch (error) {
    res.status(409).json(error.message);
  }
};

export const deleteTestSuiteById = async (req, res) => {
  try {
    const removedtestSuite = await TestSuite.deleteOne({
      _id: req.params.testsuiteId,
    });

    res.status(200).json(removedtestSuite);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
