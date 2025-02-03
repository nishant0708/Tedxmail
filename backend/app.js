const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors"); // Import cors
const auth = require("./Routes/auth");
const uploadRoutes = require('./Routes/uploadRoutes');
// const userRoutes = require('./routes/userRoutes');
dotenv.config();
// require('dotenv').config();

const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json());

// MongoDB Connection
const uri = process.env.MONGO_URI;
mongoose.connect( uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Routes
app.use("/api", auth);
app.use("/api", uploadRoutes);
// app.use('/api/users', userRoutes)

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
