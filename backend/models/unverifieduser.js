const mongoose = require("mongoose");

const unverifieduser = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    otp: { type: String },
    otpExpiry: { type: Date },
    isVerified: { type: Boolean, default: false }, // Add field to check verification status
    role: { type: String, enum: ["user", "admin"], default: "user" }, // Add field for roles
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Unverifieduser", unverifieduser);
