import Project from "../models/project.js";
import { body, validationResult } from "express-validator";

export const getProjects = async (req, res) => {
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
    const projects = await Project.find()
      .limit(limit)
      .skip(limit * page);

    res.status(200).json(projects);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createProject = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const newProject = new Project({
    name: req.body.name,
    description: req.body.description,
  });
  try {
    await newProject.save();
    res.status(200).json(newProject);
  } catch (error) {
    res.status(409).json(error.message);
  }
};

export const deleteProjectById = async (req, res) => {
  const { projectId } = req.params;
  try {
    const removedProject = await Project.findByIdAndDelete({
      _id:projectId,
    });
    if (!removedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(removedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProjectById = async (req, res) => {
  const { projectId } = req.params;
  const { name, description } = req.body;
  console.log("projectId", projectId);
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      {
        name,
        description,
      },
      { new: true, runValidators: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const validate = (method) => {
  switch (method) {
    case "createProject": {
      return [body("name", "Title cannot be empty").notEmpty()];
    }
  }
};
