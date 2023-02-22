import mongoose from "mongoose";

const testcaseSchema = mongoose.Schema({
  key: { type: String },
  title: { type: String, required: true },
  type: {
    type: String,
    enum: ["functional", "cross-functional"],
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
  instructions: [
    {
      steps: String,
      expectedResult: String,
    },
  ],
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

const TestCase = mongoose.model("testcase", testcaseSchema);

export default TestCase;
