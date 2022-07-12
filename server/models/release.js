import mongoose from "mongoose";

const releaseSchema = mongoose.Schema({
  key: "String",
  name: { type: String, required: true },
  description: String,
  assignedTo: String,
  endDate: Date,
  status: {
    type: String,
    enum: ["created", "inprogress", "completed"],
    default: "created",
    required: true,
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "project",
    required: true,
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

const Release = mongoose.model("release", releaseSchema);

export default Release;
