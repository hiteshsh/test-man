import mongoose from "mongoose";

const testSuiteSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
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
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "project",
    required: true,
  },
});

testSuiteSchema.pre('findOneAndUpdate', function (next) {
  this._update.updatedAt = Date.now();
  next();
});

const TestSuite = mongoose.model("testSuite", testSuiteSchema);

export default TestSuite;
