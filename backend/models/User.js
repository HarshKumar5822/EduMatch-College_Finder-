const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: String,
  username: String,
  email: String,
  phoneNumber: String,
  password: String,
  gender: String,
  savedColleges: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'College'
  }]
});

module.exports = mongoose.model("User", userSchema);
