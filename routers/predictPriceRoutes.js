const express = require("express");
const { PredictPrice } = require("../controllers/PredictPriceController");

const PredictPriceRouter = express.Router();

PredictPriceRouter.post("/predict/price", PredictPrice);

module.exports = PredictPriceRouter;
