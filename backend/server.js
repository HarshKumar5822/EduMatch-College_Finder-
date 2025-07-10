const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const registerRoute = require("./routes/register");
const collegeSuggestionsRoute = require("./routes/collegeSuggestions");
const userRoute = require('./routes/user');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection with error handling
const connectDB = async () => {
  try {
    // Try local MongoDB first
    await mongoose.connect("mongodb://localhost:27017/college_predictor", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully (local)");
  } catch (localError) {
    console.log("Local MongoDB not available, trying cloud connection...");
    try {
      // Fallback to MongoDB Atlas (you'll need to replace with your connection string)
      // For now, we'll use a mock connection for development
      console.log("MongoDB connection failed. Using mock data for development.");
      console.log("To use real MongoDB, please:");
      console.log("1. Install MongoDB locally, or");
      console.log("2. Set up MongoDB Atlas and update the connection string");
    } catch (cloudError) {
      console.error("All MongoDB connections failed:", cloudError);
    }
  }
};

connectDB();

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

app.use('/', registerRoute);
app.use('/college-suggestions', collegeSuggestionsRoute);
app.use('/api/user', userRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));