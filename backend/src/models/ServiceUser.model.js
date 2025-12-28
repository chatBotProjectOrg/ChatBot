const mongoose = require("mongoose");

const serviceUserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String },
    password: { type: String, required: true },
    role: { type: String },
    status: { type: String }
  },
  {
    collection: "service-and-maintenance-users"
  }
);

module.exports = mongoose.model("ServiceUser", serviceUserSchema);
