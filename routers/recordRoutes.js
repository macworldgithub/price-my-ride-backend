const express = require("express");
const { signup, login } = require("../controllers/authController");
const { addRecord, getRecordById, getAllRecords, deleteRecord } = require("../controllers/RecordController");

const router = express.Router();

router.post(
  "/create",
  addRecord
);

router.get(
  "/getAll",
  getAllRecords
);
router.get(
  "/getRecordById",
  getRecordById
);

router.delete(
  "/delete",
  deleteRecord
);

module.exports = router;
