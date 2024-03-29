import Section from "../models/section.js";

export const getSections = async (req, res) => {
  try {
    let testSuiteId = req.query.testSuiteId;
    const query = { testSuiteId: testSuiteId };
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
    const sections = await Section.find(query)
      .limit(limit)
      .skip(limit * page);
    res.status(200).json(sections);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createSection = async (req, res) => {
  const newSection = new Section({
    name: req.body.name,
    description: req.body.description,
    creator: req.body.creator,
    status: req.body.status,
    projectId: req.body.projectId,
    testSuiteId: req.body.testSuiteId,
  });
  try {
    await newSection.save();
    res.status(200).json(newSection);
  } catch (error) {
    res.status(409).json(error.message);
  }
};
