require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const PredictPriceRouter = require('./routers/predictPriceRoutes');


const app = express();
const PORT = process.env.PORT || 1000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', PredictPriceRouter);

app.get('/', (req, res) => {
    res.send('Welcome to the API Server');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
