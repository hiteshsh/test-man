import mongoose from "mongoose";

const testSuiteSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  creator: String,
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "project",
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
});

const TestSuite = mongoose.model("testSuite", testSuiteSchema);

export default TestSuite;
