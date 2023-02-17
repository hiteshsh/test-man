import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  name: { type: String, required: true },
  emailId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: { type: String },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  roles: [
    {
      //   roleId: {
      //     type: mongoose.Schema.Types.ObjectId,
      //     ref: "role",
      //   },
      //   projectId: {
      //     type: mongoose.Schema.Types.ObjectId,
      //     ref: "project",
      //   },
      //
      type: String,
      default: ["tester"],
    },
  ],
  refreshToken: {
    type: String,
  },
});

const User = mongoose.model("user", UserSchema);

export default User;
