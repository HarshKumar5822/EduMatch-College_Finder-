const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String },
    rating: { type: Number },
    acceptance: { type: String },
    fees: { type: String },
    website: { type: String },
    description: { type: String }
});

module.exports = mongoose.model("College", collegeSchema);
