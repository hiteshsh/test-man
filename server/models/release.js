import mongoose from "mongoose";

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
    const lastRelease = await Release.findOne().sort({ _id: -1 });
    console.log("lastRelease", lastRelease);
    const lastKey = lastRelease ? lastRelease.key : "R-00";
      const lastKeyNumber = parseInt(lastKey.split("-")[1], 10);
      const newKeyNumber = lastKeyNumber + 1;
      this.key = `R-${newKeyNumber.toString().padStart(2, "0")}`;
    
  }
  next();
});

const Release = mongoose.model("release", releaseSchema);

export default Release;
