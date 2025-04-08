const express = require("express");
const { signup, login } = require("../controllers/authController");
const { addRecord, getRecordById, getAllRecords, deleteRecord } = require("../controllers/RecordController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post(
  "/create",
  addRecord
);

router.get(
  "/getAll",
  authMiddleware,
  getAllRecords
);

router.get(
  "/getRecordById",
  authMiddleware,
  getRecordById
);

router.delete(
  "/delete",
  authMiddleware,
  deleteRecord
);

module.exports = router;
