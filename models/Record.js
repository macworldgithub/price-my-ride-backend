const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  year: { type: String, required: true },
  make: { type: String, required: true },
  model: { type: String, required: true },
  odometer: { type: String, required: true },
  specifications: { type: String, required: false },
});

const Record = mongoose.model("Record", recordSchema);
module.exports = Record;
