import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv/config";
import testcaseRoutes from "./routes/testcases.js";
import projectRoutes from "./routes/projects.js";
import userRoutes from "./routes/users.js";
import roleRoutes from "./routes/roles.js";
import testsuites from "./routes/testsuites.js";
import sections from "./routes/sections.js";
import releases from "./routes/releases.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

//routes
app.use("/", testcaseRoutes);
app.use("/", projectRoutes);
app.use("/users", userRoutes);
app.use("/roles", roleRoutes);
app.use("/", testsuites);
app.use("/", sections);
app.use("/", releases);

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
