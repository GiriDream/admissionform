const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");



const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/admissions", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a Mongoose Schema
const admissionSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  dob: String,
  course: String,
  address: String,
  gender: String,
});

// Create a Mongoose Model
const Admission = mongoose.model("Admission", admissionSchema);

// POST Route to Save Data
app.post("/submit-form", async (req, res) => {
  try {
    const newAdmission = new Admission(req.body); // Create a new record
    await newAdmission.save(); // Save to database
    res.status(201).json({ message: "Application submitted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to submit application." });
  }
});

// Start the Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
