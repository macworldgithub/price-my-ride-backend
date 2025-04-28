require("dotenv").config();
const express = require('express');
const connectDB = require("./config/db");
const cors = require('cors');  // ✅ already imported here
const dotenv = require('dotenv');
const authRoutes = require("./routers/authRoutes");
const recordRoutes = require("./routers/recordRoutes");
const PredictPriceRouter = require('./routers/predictPriceRoutes');
const EmailRouter = require('./routers/emailRoute');
const morgan = require("morgan");
const app = express();

connectDB();
console.log(process.env.MONGO_URI, "LLO")
console.log(process.env.XAI_API_URL, "LLO")

// Middleware
app.use(cors({
  origin: "http://localhost:5173", // Your frontend origin
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use('/api', PredictPriceRouter);
app.use("/api/auth", authRoutes);
app.use("/api/record", recordRoutes);
app.use("/api/email", EmailRouter);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Welcome to the API Server');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
