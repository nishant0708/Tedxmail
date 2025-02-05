const multer = require("multer");

// Configure multer for memory storage since we'll be using Firebase
const storage = multer.memoryStorage();

// Create multer instance with memory storage
const upload = multer({ storage: storage });

module.exports = upload;