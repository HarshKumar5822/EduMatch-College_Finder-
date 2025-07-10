const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/register", async (req, res) => {
  const { fullName, username, email, phoneNumber, password, gender } = req.body;

  // Basic validation (add more as needed)
  if (!fullName || !username || !email || !password || !gender) {
    return res.status(400).json({ message: "Please fill all required fields." });
  }

  // Save new user to MongoDB
  const user = new User({ fullName, username, email, phoneNumber, password, gender });
  try {
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/login", async (req, res) => {
    const { username, password } = req.query;
  
    try {
      const user = await User.findOne({ username, password });
      if (user) {
        res.status(200).json({ success: true, message: "Login successful" });
      } else {
        res.status(401).json({ success: false, message: "Invalid username or password" });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: "An error occurred", error });
    }
  });

module.exports = router;
