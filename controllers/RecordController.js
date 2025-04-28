const Record = require("../models/Record");

const addRecord = async (req, res) => {
  try {
    // Removed wholesale and retail from the destructuring
    const { year, make, model, odometer, specifications } = req.body;

    // Ensure that only the required fields are provided
    if (!year || !make || !model || !odometer) {
      return res.status(400).json({ error: "All fields are required." });
    }

    
    const data = {
      year: String(year),
      make,
      model,
      odometer: String(odometer),
      specifications: specifications ? specifications : "-",
    };

    // Create the new record with the updated data
    const newRecord = new Record(data);
    await newRecord.save();
    res.status(201).json({ message: "Record added successfully.", record: newRecord });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllRecords = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    let offset = (page - 1) * limit;
    const records = await Record.find().skip(offset).limit(limit);
    const total = await Record.countDocuments();
    res.status(200).json({ records, total });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRecordById = async (req, res) => {
  try {
    const { id } = req.query;
    const record = await Record.findById(id);

    if (!record) {
      return res.status(404).json({ error: "Record not found." });
    }

    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ error: "Invalid record ID." });
  }
};

const deleteRecord = async (req, res) => {
  try {
    const { id } = req.query;
    const record = await Record.findByIdAndDelete(id);

    if (!record) {
      return res.status(404).json({ error: "Record not found." });
    }

    res.status(200).json({ message: "Record deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Invalid record ID." });
  }
};

module.exports = {
  addRecord,
  getAllRecords,
  getRecordById,
  deleteRecord,
};
