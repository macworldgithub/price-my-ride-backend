require("dotenv").config();
const express = require('express');
const connectDB = require("./config/db");
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require("./routers/authRoutes");
const recordRoutes = require("./routers/recordRoutes");
const PredictPriceRouter = require('./routers/predictPriceRoutes');
const EmailRouter = require('./routers/emailRoute');
const morgan = require("morgan");

connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use('/api', PredictPriceRouter);
app.use("/api/auth", authRoutes);
app.use("/api/record", recordRoutes);
app.use("/api/email", EmailRouter);


app.get('/', (req, res) => {
    res.send('Welcome to the API Server');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
