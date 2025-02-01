require("dotenv").config(); // Load .env variables at the very top
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const nodemailer = require("nodemailer");
const auth = require("./Routes/auth");

const app = express();

// Middleware
app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Multer for file uploads
const storage = multer.memoryStorage(); // Store files in memory buffer
const upload = multer({ storage: storage }); // Initialize multer

app.use(upload.none()); // This will allow parsing of multipart/form-data requests with no files


// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.use("/api", auth);

app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "Your server is up and running...."
	});
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
