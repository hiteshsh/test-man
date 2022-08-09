import mongoose from "mongoose";

const RoleSchema = mongoose.Schema({
  name: { type: String, required: true },
  creator: String,
  priviledge: [
    {
      name: { type: String },
      ptype: [
        {
          name: { type: String },
          allowed: { type: Boolean },
          show: { type: Boolean }
          
        },
      ],
    },
  ],
});

const Role = mongoose.model("role", RoleSchema);

export default Role;
