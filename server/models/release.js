import mongoose from "mongoose";
import generateUniqueKey from "../util/keygenerator.js";

const testResultSchema = new mongoose.Schema({
  result: {
    type: String,
    enum: ["untested", "passed", "failed", "blocked"],
    default: "untested",
  },
  addedOn: { type: Date, default: Date.now },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: false,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: false,
  },
});

const testExecutionSchema = new mongoose.Schema({
  testCase: { type: mongoose.Schema.Types.ObjectId, ref: "TestCase" },
  results: [testResultSchema],
});

const releaseSchema = mongoose.Schema({
  key: { type: String, unique: true },
  name: { type: String, required: true },
  description: String,
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: false,
  },
  endDate: Date,
  status: {
    type: String,
    enum: ["active", "completed", "archived"],
    default: "active",
    required: true,
  },
  testCaseInclusionType: {
    type: String,
    enum: ["all", "specific", "filter"],
    default: "all",
    required: true,
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "project",
    required: true,
  },
  testExecutions: [testExecutionSchema],
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
});

releaseSchema.pre("save", async function (next) {
  if (this.isNew) {
    this.key = await generateUniqueKey(Release, "R");
  }
  next();
});

const Release = mongoose.model("release", releaseSchema);

export default Release;
