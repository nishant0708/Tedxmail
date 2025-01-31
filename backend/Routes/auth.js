// ./backend/Routes/auth.js
const express = require("express");
const { signUp, verifyUser, sendMailController } = require("../Controllers/usercontroller");
// const { login, signup } = require("../Controllers/authController");
const { login } = require("../Controllers/usercontroller");
const authenticateToken = require("../Middleware/tokenVerification");

const router = express.Router();
router.post('/login', login);

router.post("/signup", signUp);
router.post("/verifypasscode",verifyUser)
router.post("/send-email", sendMailController);


module.exports = router;
