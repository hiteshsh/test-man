import User from "../models/user.js";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv/config";

export const loginUser = async (req, res) => {
  console.log("inside login");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  const { emailId, password } = req.body;

  const foundUser = await User.findOne({ emailId: emailId }).populate("roles");
  if (!foundUser || foundUser.status !== "active")
    return res.status(401).json({ message: "unauthorised" });
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    const roles = Object.values(foundUser.roles).filter(Boolean);
    const accessToken = jwt.sign(
      {
        UserInfo: {
          id: foundUser.id,
          emailId: foundUser.emailId,
          roles: foundUser.roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    const refreshToken = jwt.sign(
      { emailId: foundUser.emailId },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    foundUser.refreshToken = refreshToken;

    const result = await foundUser.save();
    console.log(result);

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ roles: roles, token: accessToken });
  } else {
    res.status(401).json({ message: "unauthorised" });
  }
};

export const refreshToken = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorised" });
  console.log(cookies.jwt);
  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) return res.status(403).status({ message: "Forbidden" });

      const foundUser = await User.findOne({ emailId: decoded.emailId });
      if (!foundUser) return res.status(401).json({ message: "Unauthorized" });
      const roles = Object.values(foundUser.roles);
      const accessToken = jwt.sign(
        {
          UserInfo: {
            emailId: foundUser.emailId,
            roles: roles,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "30s" }
      );
      res.status(200).json({ roles: roles, token: accessToken });
    }
  );
};

export const logoutUser = async (req, res) => {
  const cookies = req.cookies;
  console.log("cookie", cookies?.jwt);
  if (!cookies?.jwt) return res.status(204).json({ message: "No content" });
  const refreshToken = cookies.jwt;
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: false });
    return res.sendStatus(204);
  }
  foundUser.refreshToken = "";
  const result = await foundUser.save();
  console.log(result);
  res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
  res.status(200).json({ message: "Logout successful" });
};

export const validate = (method) => {
  switch (method) {
    case "loginUser": {
      return [
        body("emailId", "EmailId cannot be empty").notEmpty(),
        body("password", "Password cannot be empty").notEmpty(),
      ];
    }
  }
};
