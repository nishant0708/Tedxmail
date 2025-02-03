// ./backend/Routes/auth.js
const express = require("express");
const multer = require("multer");
const { signUp, verifyUser , sendMailController, login } = require("../Controllers/usercontroller");
const authenticateToken = require("../Middleware/tokenVerification");

const router = express.Router();

// ✅ Configure Multer to store files in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/login", login);
router.post("/signup", signUp);
router.post("/verifypasscode", verifyUser );

// ✅ Ensure file uploads are handled properly
router.post("/send-email", upload.any("name"), sendMailController);


// only for testing file upload and it works too
router.post("/test-upload", upload.single("name"), (req, res) => {
    console.log("File received:", req.file);
    res.status(200).json({ message: "File uploaded successfully!" });
});

module.exports = router;