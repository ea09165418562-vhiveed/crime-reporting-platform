const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
    title: String,
    category: String,
    location: String,
    description: String,
    reporter: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Report", ReportSchema);