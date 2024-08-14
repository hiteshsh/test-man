import mongoose from "mongoose";

const sectionSchema = mongoose.Schema({
  name: { type: String, required: true },
  testSuiteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "testSuite",
    required: true,
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "project",
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
});

sectionSchema.pre("findOneAndUpdate", function (next) {
  this._update.updatedAt = Date.now();
  next();
});

const Section = mongoose.model("section", sectionSchema);

export default Section;
