import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv/config";
import testcaseRoutes from "./routes/testcases.js";
import projectRoutes from "./routes/projects.js";
import userRoutes from "./routes/users.js";
import roleRoutes from "./routes/roles.js";
import authRoutes from "./routes/auth.js";
import testsuites from "./routes/testsuites.js";
import sections from "./routes/sections.js";
import releases from "./routes/releases.js";
import corsOptions from "./config/corsOptions.js";
import verifyJWT from "./middleware/verifyJWT.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(cors(corsOptions));

app.use(express.json());
// Middleware
app.use(cookieParser());

//routes
app.use("/", authRoutes);
app.use(verifyJWT);
app.use("/", testcaseRoutes);
app.use("/", projectRoutes);
app.use("/users", userRoutes);
app.use("/roles", roleRoutes);
app.use("/", testsuites);
app.use("/", sections);
app.use("/", releases);
app.use("/", userRoutes);

const PORT = process.env.PORT || 5002;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));

//mongoose.set('useFindAndModify', false);
