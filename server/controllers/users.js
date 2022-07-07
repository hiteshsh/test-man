import User from "../models/user.js";
import { body, validationResult } from "express-validator";

export const getUsers = async (req, res) => {
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
    const users = await User.find()
      .limit(limit)
      .skip(limit * page);
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  const user = req.body;
  console.log(user);
  const newUser = new User({
    name: req.body.name,
    emailId: req.body.emailId,
    creator: req.body.creator,
    roleId: req.body.roleId,
    status: req.body.status,
  });
  try {
    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    res.status(409).json(error.message);
  }
};

export const deleteUserById = async (req, res) => {
  try {
    const removedUser = await User.deleteOne({
      _id: req.params.id,
    });

    res.status(200).json(removedUser);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateUserById = async (req, res) => {
  try {
    const updatedUser = await User.updateOne({
      _id: req.params.id,
      $set: {
        name: req.body.name,
        emailId: req.body.emailId,
        creator: req.body.creator,
        roleId: req.body.roleId,
        status: req.body.status,
      },
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const validate = (method) => {
  switch (method) {
    case "addUser": {
      return [body("emailId", "EmailId cannot be empty").notEmpty()];
    }
  }
};
