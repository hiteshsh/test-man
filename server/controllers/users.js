import User from "../models/user.js";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";

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
  const { name, emailId, password, status, roles } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  const user = req.body;
  console.log(user);
  const newUser = new User({
    name,
    emailId,
    password,
    status,
    roles: roles && roles.length ? roles : ["tester"],
  });

  try {
    //not working need to check
    const duplicateUser = await User.findOne({ emailId: emailId });
    if (duplicateUser)
      return res.status(409).json({ message: "Duplicate User" });
    const hashedPwd = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashedPwd;
    console.log("user", newUser);
    await newUser.save();

    res
      .status(200)
      .json({ success: `New User ${newUser.emailId} is created!` });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const deleteUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    const removedUser = await User.findByIdAndDelete({
      _id: userId,
    });
    if (!removedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ success: `User is removed!` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUserById = async (req, res) => {
  const { userId } = req.params;
  const { name, status, roles } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, status, roles },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).send("User not found");
    }

    res.status(200).send({ success: `User is updated!` });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getUserById = async (req, res) => {
  const { userId } = req.params;

  try {
    const getUser = await User.findOne({
      _id: userId,
    });
    if (!getUser) {
      res.status(404).json({ message: "No user found" });
    }
    res.status(200).json(getUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const validate = (method) => {
  switch (method) {
    case "addUser": {
      return [
        body("emailId", "EmailId cannot be empty").notEmpty(),
        body("password", "Password cannot be empty").notEmpty(),
        body("name", "Name cannot be empty").notEmpty(),
      ];
    }
  }
};
