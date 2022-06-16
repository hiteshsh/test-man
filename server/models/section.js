import mongoose from "mongoose";

const sectionSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  creator: String,
  testsuiteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "testSuite",
    required: true,
  },
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

const Section = mongoose.model("section", sectionSchema);

export default Section;
