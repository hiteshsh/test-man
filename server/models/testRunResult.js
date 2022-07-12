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
  currentStatus: {
    type: String,
    enum: ["Passed", "Failed", "Untested", "Blocked"],
    default: "Untested",
  },
  results: [
    {
      status: {
        type: String,
        enum: ["Passed", "Failed", "Untested", "Blocked"],
        default: "Untested",
      },
      comment: String,
      executedAt: {
        type: Date,
        default: new Date(),
      },
    },
  ],
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: false,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: false,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const testRunResult = mongoose.model("testRunResult", testRunResultSchema);

export default testRunResult;
