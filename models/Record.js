const mongoose = require("mongoose");

const RecordsSchema = new mongoose.Schema(
  {
    year: { type: String, required: true },
    make: { type: String, required: true},
    model: { type: String, required: true },
    odometer: { type: String, required: true },
    specifications: { type: String, required: true },
    // wholesale_low: { type: String, required: true },
    // wholesale_high: { type: String, required: true },
    // retail_low: { type: String, required: true },
    // retail_high: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("record", RecordsSchema);
