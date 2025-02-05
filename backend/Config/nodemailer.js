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


exports.sendEmail = async ({ email, ccArray, subject, content, attachmentURL }) => {
  try {
    // Configure email options
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: subject,
      html: content,
      cc: ccArray
    };

    // Add attachment if URL exists
    if (attachmentURL) {
      mailOptions.attachments = [{
        // Generate a filename from the URL
        filename: `attachment-${Date.now()}${getFileExtension(attachmentURL)}`,
        path: attachmentURL
      }];
    }

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    return info;

  } catch (error) {
    console.error("Error in sendEmail:", error);
    throw error;
  }
};

// Helper function to get file extension from URL
const getFileExtension = (url) => {
  // Extract file extension from the URL or default to .pdf
  const match = url.match(/\.([^.]+)$/);
  return match ? match[0] : '.pdf';
};



