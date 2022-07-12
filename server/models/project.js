import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
  key: String,
  name: { type: String, required: true },
  description: String,
  prefix: { type: String, default: "PROJ" },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: false,
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: false,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
});

const Project = mongoose.model("project", projectSchema);

export default Project;
