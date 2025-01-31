const UnverifiedUser = require("../models/unverifieduser");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require('jsonwebtoken');
const { sendOtpToEmail, sendEmail } = require("../Config/nodemailer");

// Sign-Up Function
const signUp = async (req, res) => {
  const { name, email, mobileNumber, password } = req.body;

  try {
    // Check if user already exists in the verified users
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists." });
    }

    // Check if user exists in unverified users
    const existingUnverifiedUser = await UnverifiedUser.findOne({ email });
    if (existingUnverifiedUser) {
      return res.status(400).json({ error: "User already registered but not verified. Please verify your email." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate OTP and expiry
    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpiry = Date.now() + 2 * 24 * 60 * 60 * 1000; // 2 days

    // Create a new unverified user
    const newUser = new UnverifiedUser({
      name,
      email,
      mobileNumber,
      password: hashedPassword,
      otp,
      otpExpiry,
    });

    await newUser.save();

    // Send OTP to user's email
    const customText = `ALERT, ${name}! is trying to signup, and his otp is this ${otp} . This OTP will expire in 48 hours.`;
    await sendOtpToEmail(email, otp, customText);

    res.status(200).json({ message: "OTP sent to your email. Please verify your account." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const verifyUser = async (req, res) => {
    const { email, otp } = req.body;
  
    try {
      console.log("Verifying user with email:", email); // Log email
  
      // Find the unverified user
      const unverifiedUser = await UnverifiedUser.findOne({ email });
      if (!unverifiedUser) {
        console.error("Unverified user not found for email:", email);
        return res.status(404).json({ error: "user not found." });
      }
  
      console.log("Found unverified user:", unverifiedUser);
  
      // Validate OTP and expiry
      if (unverifiedUser.otp !== otp) {
        console.error("Invalid OTP provided:", otp);
        return res.status(400).json({ error: "Invalid OTP." });
      }
  
      if (unverifiedUser.otpExpiry < Date.now()) {
        console.error("OTP expired for email:", email);
        return res.status(400).json({ error: "OTP has expired." });
      }
  
      console.log("OTP is valid, transferring user data to verified User model.");
  
      // Transfer user data to the verified User model
      const { name, mobileNumber, password } = unverifiedUser;
      const verifiedUser = new User({
        name,
        email,
        mobileNumber,
        password,
        isVerified: true,
      });
  
      await verifiedUser.save();
  
      console.log("Verified user saved to User collection.");
  
      // Delete the unverified user
      await UnverifiedUser.deleteOne({ email });
      console.log("Unverified user deleted from UnverifiedUser collection.");
  
      res.status(200).json({
        success: true,
        message: "Verification successful. You can now log in.",
      });
    } catch (error) {
      console.error("Error during user verification:", error);
      res.status(500).json({ error: "Server error" });
    }
  };
  
  const JWT_SECRET = "your_secret_key"; // Replace with a secure, environment-specific secret key

  // Example: Login function with token generation
  const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Validate email and password
      if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
      }
  
      // Fetch user from the database
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Compare entered password with hashed password in the database
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
  
      // Generate JWT token
      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
        },
        JWT_SECRET,
        { expiresIn: "6h" }
      );
  
      // Generate session ID and set expiry to 6 hours from now
      const sessionId = crypto.randomBytes(16).toString("hex");
      const expiresAt = new Date(Date.now() + 6 * 60 * 60 * 1000); // 6 hours from now
  
      // Save session to user's sessions array
      if (!user.sessions) {
        user.sessions = [];
      }
      user.sessions.push({ sessionId, expiresAt });
      await user.save();
  
      // Send token, session ID, and user details to the client
      res.status(200).json({
        message: "Login successful",
        token,
        sessionId,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
        },
      });
    } catch (err) {
      console.error("Error in login:", err.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  const sendMailController = async (req, res) => {
    
    const { email, cc, subject, content } = req.body;

    try {

      if (!email || !subject || !content) {
        return res.status(400).json({ error: "Email, subject, and content are required" });
      }
  
      const ccArray = cc ? (Array.isArray(cc) ? cc : [cc]) : [];
      
      await sendEmail(email, ccArray, subject, content);
      
      res.status(200).json({ 
        success: true,
        message: "Email sent successfully" });
    } catch (error) {
      console.log("error in sending mail:", error.message);
      res.status(500).json({ message: error.message });
    }
  };
  
  
module.exports = {
  signUp,
  verifyUser,
  login,
  sendMailController
};
