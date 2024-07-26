import mongoose from "mongoose";
import generateUniqueKey from "../util/keygenerator.js";

const projectSchema = mongoose.Schema({
  key: { type: String, unique: true },
  name: { type: String, required: true },
  description: String,
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
    immutable: true,
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

projectSchema.pre("save", async function (next) {
  if (this.isNew) {
    this.key = await generateUniqueKey(Project, "PR");
  }
  next();
});

projectSchema.pre("findOneAndUpdate", function (next) {
  this._update.updatedAt = Date.now();
  next();
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
