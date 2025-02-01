require("dotenv").config();
const nodemailer = require("nodemailer");

// Create a Nodemailer transporter using SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // Use host, not service
  port: 587, // Use 465 for secure SSL, 587 for TLS
  secure: false, // false for TLS (port 587), true for SSL (port 465)
  auth: {
    user: process.env.MAIL_USER, // Email address
    pass: process.env.MAIL_PASS, // App Password (not normal password)
  },
});

// Function to send OTP via email
exports.sendOtpToEmail = async (email, otp, text) => {
  try {
    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: process.env.MAIL_USER,
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


exports.sendEmail = async (email, ccArray, subject, content, file) => {
  try {
    // Log file properties for debugging (be cautious with sensitive data)
    console.log("File properties:", {
      originalname: file?.originalname,
      buffer: file?.buffer ? file.buffer.toString('base64') : null, // Convert buffer to base64 for logging
    });

    const attachments = file ? [{
      filename: file.originalname,
      content: file.buffer,
    }] : [];

    const info = await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      cc: ccArray,
      subject: subject,
      html: content,
      attachments: attachments,
    });

    console.log("Mail sent successfully", info.response);
    return info; // Optionally return the info object
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error(`Failed to send email to ${email} with subject "${subject}": ${error.message}`);
  }
};
