import mongoose from "mongoose";

const testcaseSchema = mongoose.Schema({
  testCaseId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: {
    type: String,
    enum: ["functional", "cross-functional"],
    default: "functional",
  },
  prerequisite: String,
  creator: String,
  tags: [String],
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
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
    required: true,
  },
  priority: {
    type: String,
    enum: ["High", "Medium", "Low"],
    default: "High",
  },
  automated: {
    type: Boolean,
    default: false,
  },
});

const TestCase = mongoose.model("testcase", testcaseSchema);

export default TestCase;
