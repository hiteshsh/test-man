import mongoose from "mongoose";

const stepsSchema = new mongoose.Schema({
  instruction: String,
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
    const lastTestCase = await this.constructor.findOne().sort({ _id: -1 });
    console.log("lastTestCase ", lastTestCase);
    const lastKey = lastTestCase ? lastTestCase.key : "TC-00";
    console.log("lastKey ", lastKey);
    const lastKeyNumber = parseInt(lastKey.split("-")[1], 10);
    const newKeyNumber = lastKeyNumber + 1;
    this.key = `TC-${newKeyNumber.toString().padStart(2, "0")}`;
  }
  next();
});

const TestCase = mongoose.model("testcase", testcaseSchema);

export default TestCase;
