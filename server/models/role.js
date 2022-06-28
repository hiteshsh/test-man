import mongoose from "mongoose";

const RoleSchema = mongoose.Schema({
  name: { type: String, required: true },
  creator: String,
  priviledge: [
    {
      name: { type: String },
      type: [
        {
          name: { type: String },
          allowed: boolean,
          show: boolean,
          disabled: boolean,
        },
      ],
    },
  ],
});

const Role = mongoose.model("role", RoleSchema);

export default Role;
