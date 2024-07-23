import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  permissions: {
    project: {
      view: { type: Boolean, default: false },
      addEdit: { type: Boolean, default: false },
      delete: { type: Boolean, default: false },
    },
    testCase: {
      view: { type: Boolean, default: false },
      addEdit: { type: Boolean, default: false },
      delete: { type: Boolean, default: false },
    },
    release: {
      view: { type: Boolean, default: false },
      addEdit: { type: Boolean, default: false },
      delete: { type: Boolean, default: false },
    },
    user: {
      view: { type: Boolean, default: false },
      addEdit: { type: Boolean, default: false },
      delete: { type: Boolean, default: false },
    },
    role: {
      view: { type: Boolean, default: false },
      addEdit: { type: Boolean, default: false },
      delete: { type: Boolean, default: false },
    },
    dashboard: {
      view: { type: Boolean, default: false },
    },
    report: {
      view: { type: Boolean, default: false },
    },
  },
});

const Role = mongoose.model("Role", RoleSchema);

export default Role;
