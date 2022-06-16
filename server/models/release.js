import mongoose from "mongoose";

const releaseSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  creator: String,
  status: {
    type: String,
    enum: ["created", "inprogress", "completed"],
    default: "created",
    required: true,
  },
  testcases: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "testSuite",
        required: true,
      },
      status: {
        type: String,
        enum: ["untested", "passed", "failed"],
        default: "untested",
        required: true,
      },
    },
  ],
});

const Release = mongoose.model("release", releaseSchema);

export default Release;
