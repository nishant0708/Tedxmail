const cloudinary = require("cloudinary").v2;
require("dotenv").config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to upload file to Cloudinary
const uploadToCloudinary = async (file) => {
  try {
    console.log("📂 Uploading file to Cloudinary...");
    console.log("")
    
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { resource_type: "auto" },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      ).end(file.data); // Pass file buffer
    });

    console.log("✅ File uploaded to Cloudinary:", result.secure_url);
    return result.secure_url;
  } catch (error) {
    console.error("❌ Error uploading to Cloudinary:", error);
    throw error;
  }
};
module.exports = uploadToCloudinary;
