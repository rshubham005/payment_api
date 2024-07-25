const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true, unique: true },
  otp: { type: String },
  otpExpires: { type: Date },
  token: { type: String },
});

module.exports =
  mongoose.models.users || mongoose.model("users", userSchema);
