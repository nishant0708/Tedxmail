require("dotenv").config();
const nodemailer = require("nodemailer");
const fetch = require("node-fetch");

// Create a Nodemailer transporter using SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // Use host, not service
  port: 587, // Use 465 for secure SSL, 587 for TLS
  secure: false, // false for TLS (port 587), true for SSL (port 465)
  auth: {
    user: process.env.EMAIL_USER, // Email address
    pass: process.env.EMAIL_PASS, // App Password (not normal password)
  },
});

// Function to send OTP via email
exports.sendOtpToEmail = async (email, otp, text) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "Your OTP Code",
      text: text || `Your OTP code is ${otp}`, // Use the provided text or a default message
    });
    console.log("OTP sent successfully via email");
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw new Error("Failed to send OTP email");
  }
};


// Function to send mail


exports.sendEmail = async (items) => {
  try {
    console.log("sendEmail() called with:", items);

    const { email, ccArray, subject, content, file } = items;

    if (!email) {
      throw new Error("No recipient email provided");
    }

    // Fetch and attach files as buffers
    const attachments = await Promise.all(
      file.map(async (f) => {
        const response = await fetch(f.path);
        const buffer = await response.buffer();
        return {
          filename: f.originalname,
          content: buffer,
          encoding: "base64",
        };
      })
    );

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      cc: ccArray,
      subject: subject || "No Subject",
      html: content || "",
      attachments,
    };

    console.log("✉️ Mail Options:", mailOptions);

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Mail sent successfully:", info.response);
    return info;
  } catch (error) {
    console.error("❌ Error sending email:", error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};




