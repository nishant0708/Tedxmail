const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../Config/cloudinaryConfig");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads", // Folder name in Cloudinary
    allowed_formats: ["jpg", "png", "pdf", "docx"], // Allowed file types
    public_id: (req, file) => `${Date.now()}-${file.originalname}`,
  },
});

// ✅ Fix: Ensure `upload` is a Multer instance
const upload = multer({ storage: storage });

module.exports = upload;


