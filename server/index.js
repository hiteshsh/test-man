import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv/config";
import testcaseRoutes from "./routes/testcases.js";
import projectRoutes from "./routes/projects.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

//routes
app.use("/testcases", testcaseRoutes);
app.use("/", projectRoutes);

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
