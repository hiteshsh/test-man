import mongoose from "mongoose";

const testRunResultSchema = mongoose.Schema({
  testCaseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "testcase",
    required: true,
  },
  releaseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "release",
    required: true,
  },
  status: {
    type: String,
    enum: ["Passed", "Failed", "Untested", "Blocked"],
    default: "Untested",
  },
  comment: String,
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: false,
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: false,
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

const testRunResult = mongoose.model("testRunResult", testRunResultSchema);

export default testRunResult;
