// ./backend/Routes/auth.js
const express = require("express");
const multer = require("multer");
const { signUp, verifyUser , sendMailController, login } = require("../Controllers/usercontroller");
const authenticateToken = require("../Middleware/tokenVerification");
const upload = require("../Middleware/uploadMiddleware");

const router = express.Router();


router.post("/login", login);
router.post("/signup", signUp);
router.post("/verifypasscode", verifyUser );

// ✅ Ensure file uploads are handled properly
router.post(
    "/sending-mail",
    upload.fields([{ name: "file", maxCount: 1 }]),
    sendMailController
);

  

// only for testing file upload and it works too

router.post("/test-upload", upload.single('file'), (req, res) => {
    console.log("Received request:", {
        file: req.file,
        body: req.body
    });

    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    res.status(200).json({ 
        message: "File uploaded successfully!", 
        filename: req.file.originalname,
        fileUrl: req.file.path  // ✅ Cloudinary URL
    });
});


module.exports = router;