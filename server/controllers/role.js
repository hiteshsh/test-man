import Role from "../models/role.js";
import { body, validationResult } from "express-validator";

export const getRoles = async (req, res) => {
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
    const roles = await Role.find()
      .limit(limit)
      .skip(limit * page);
    res.status(200).json(roles);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addRole = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  const role = req.body;
  const newRole = new Role({
    name: req.body.name,
    creater: req.body.creater,
    priviledge: req.body.priviledge,
  });
  try {
    await newRole.save();
    res.status(200).json(newRole);
  } catch (error) {
    res.status(409).json(error.message);
  }
};

export const deleteUserById = async (req, res) => {
  try {
    const removedRole = await Role.remove({
      _id: req.params.id,
    });

    res.status(200).json(removedRole);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateRoleById = async (req, res) => {
  try {
    const updatedRole = await Role.updateOne({
      _id: req.params.id,
      $set: {
        name: req.body.name,
        creater: req.body.creater,
        priviledge: req.body.priviledge,
      },
    });

    res.status(200).json(updatedRole);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const validate = (method) => {
  switch (method) {
    case "addRole": {
      return [body("name", "Role name cannot be empty").notEmpty()];
    }
  }
};
