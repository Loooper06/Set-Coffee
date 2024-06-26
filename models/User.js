const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      default: "USER",
    },
    refreshToken: String,
  },
  { timestamps: true }
);

const model = mongoose.models.User || mongoose.model("User", schema);

module.exports = model;
