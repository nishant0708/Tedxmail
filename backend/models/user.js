const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    isVerified:{type: Boolean ,default: true},
    sessions: [
      {
        sessionId: { type: String },
        createdAt: { type: Date, default: Date.now },
        expiresAt: { type: Date }, // Expiry time for the session
      },
    ],
    sessions: [{
      sessionId: {
        type: String,
        required: true
      },
      expiresAt: {
        type: Date,
        required: true
      }
    }],
    resetPasswordToken: { type: String }, // Field for storing the hashed reset token
    resetPasswordExpiry: { type: Date }, // Field for storing the token expiry time
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

module.exports = mongoose.model("User", User);
