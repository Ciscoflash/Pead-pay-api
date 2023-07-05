const mongoose = require("mongoose");
const userModel = mongoose.Schema({
  name: { type: String, required: true },
  number: { type: String, required: true },
  email: { type: String, required: true },
  dob: { type: Date, default: Date.now() },
  address: { type: String, required: true },
  timestamps: true,
});

const User = mongoose.model("users", userModel);
module.exports = User;
