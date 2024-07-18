import Role from "../models/role.js";
import { body, validationResult } from "express-validator";

export const getRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).send(roles);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getRoleById = async (req, res) => {
  const { roleId } = req.params;

  try {
    const role = await Role.findById(roleId);
    if (!role) {
      return res.status(404).send("Role not found");
    }
    res.status(200).send(role);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const addRole = async (req, res) => {
  const { name, permissions } = req.body;

  if (!name || !permissions) {
    return res.status(400).send("Name and permissions are required");
  }

  try {
    const newRole = new Role({ name, permissions });
    await newRole.save();
    res.status(201).send(newRole);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deleteRoleById = async (req, res) => {
  const { roleId } = req.params;

  try {
    const deletedRole = await Role.findByroleIdAndDelete(roleId);
    if (!deletedRole) {
      return res.status(404).send("Role not found");
    }
    res.status(200).send(deletedRole);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateRoleById = async (req, res) => {
  const { roleId } = req.params;
  const { name, permissions } = req.body;

  if (!name || !permissions) {
    return res.status(400).send("Name and permissions are required");
  }

  try {
    const updatedRole = await Role.findByIdAndUpdate(
      roleId,
      { name, permissions },
      { new: true, runValidators: true }
    );

    if (!updatedRole) {
      return res.status(404).send("Role not found");
    }

    res.status(200).send(updatedRole);
  } catch (error) {
    res.status(500).send(error);
  }
};

// export const validate = (method) => {
//   switch (method) {
//     case "addRole": {
//       return [body("name", "Role name cannot be empty").notEmpty()];
//     }
//   }
// };
