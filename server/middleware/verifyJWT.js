import jwt from "jsonwebtoken";
import dotenv from "dotenv/config";
import User from "../models/user.js";

const verifyJWT = async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({
      message: "Access denied. You do not have the required permissions.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded.UserInfo.id).populate("roles");
    if (!user) {
      return res.status(401).json({
        message: "Access denied. You do not have the required permissions..",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Access denied. You do not have the required permissions...",
    });
  }
};

export const authorize = (requiredPermissions) => {
  return async (req, res, next) => {
    const user = req.user;

    const hasPermission = user.roles.some((role) => {
      return requiredPermissions.some((permission) => {
        return role.permissions[permission.resource][permission.action];
      });
    });

    if (!hasPermission) {
      return res.status(403).json({
        message: "Access denied. You do not have the required permissions....",
      });
    }
    next();
  };
};

export default verifyJWT;
