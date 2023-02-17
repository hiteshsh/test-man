import jwt from "jsonwebtoken";
import dotenv from "dotenv/config";

const verifyJWT = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ message: "Unauthorized" });
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Forbidden" });
    req.user = decoded.UserInfo.emailId;
    req.roles = decoded.UserInfo.roles;
    next();
  });
};

export default verifyJWT;
