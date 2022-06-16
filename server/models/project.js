import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  prefix: { type: String, default: "PROJ" },
  creator: String,
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
});

const Project = mongoose.model("project", projectSchema);

export default Project;
