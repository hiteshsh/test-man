import TestSuite from "../models/testSuite.js";

export const getTestSuites = async (req, res) => {
  try {
    let projectId = req.params.projectId;
    const query = { projectId: projectId };
    //console.log("projectId", req.query.projectId);

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
      .skip(limit * page);
    res.status(200).json(testSuites);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

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
