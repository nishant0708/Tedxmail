const express = require('express');
const multer = require('multer');
const cloudinary = require('../Config/cloudinaryConfig');

const router = express.Router();
const storage = multer.memoryStorage(); // Use memory storage for temporary file handling
const upload = multer({ storage: storage });

router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const result = await cloudinary.uploader.upload_stream((error, result) => {
      if (result) {
        res.json({ imageUrl: result.secure_url });
      } else {
        res.status(500).json({ error: error.message });
      }
    }).end(req.file.buffer);
  } catch (error) {
    res.status(500).json({ error: 'Error uploading file' });
  }
});

module.exports = router;
