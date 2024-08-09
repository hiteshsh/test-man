import mongoose from "mongoose";
import generateUniqueKey from "../util/keygenerator.js";

const stepsSchema = new mongoose.Schema({
  step: String,
  expectedResult: String,
});

const testcaseSchema = mongoose.Schema({
  key: { type: String, unique: true },
  title: { type: String, required: true },
  type: {
    type: String,
    enum: ["functional", "performance", "security"],
    default: "functional",
  },
  externalId: {
    type: String,
  },
  prerequisite: String,
  tags: [String],
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  steps: [stepsSchema],
  // steps:[],
  // expectedResult:[],
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "project",
    required: true,
  },
  testsuiteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "testSuite",
    required: true,
  },
  sectionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "section",
  },
  priority: {
    type: String,
    enum: ["high", "medium", "low"],
    default: "high",
  },
  automated: {
    type: Boolean,
    default: false,
  },
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

testcaseSchema.pre("save", async function (next) {
  if (this.isNew) {
    this.key = await generateUniqueKey(TestCase, "TC");
  }
  next();
});

const TestCase = mongoose.model("testcase", testcaseSchema);

export default TestCase;
