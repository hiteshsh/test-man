import Release from "../models/release.js";

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
  const release = req.body;
  console.log(release);
  const newRelease = new Release({
    name: req.body.name,
    description: req.body.description,
    projectId: req.body.projectId,
    status: req.body.status,
  });
  try {
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
  try {
    const updatedRelease = await Release.updateOne({
      _id: req.params.releaseId,
      $set: {
        name: req.body.name,
        description: req.body.description,
        projectId: req.body.projectId,
        status: req.body.status,
      },
    });

    res.status(200).json(updatedRelease);
  } catch (error) {
    console.log("req", req.body);
    res.status(404).json({ message: error.message });
  }
};
