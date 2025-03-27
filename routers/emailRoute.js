const express = require('express');
const { SendEmail } = require('../controllers/emailSendController');

const EmailRouter = express.Router();

EmailRouter.post('/send', SendEmail);

module.exports = EmailRouter;
