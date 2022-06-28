import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  name: { type: String, required: true },
  emailId: { type: String, required: true },
  creator: String,
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  roleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "role",
  },
});

const User = mongoose.model("user", UserSchema);

export default User;
