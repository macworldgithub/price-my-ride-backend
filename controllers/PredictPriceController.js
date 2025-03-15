const axios = require('axios');
require('dotenv').config();

const XAI_API_KEY = process.env.XAI_API_KEY;
const XAI_API_URL = process.env.XAI_API_URL;

const PredictPrice = async (req, res) => {
    try {
        const { make,model,year } = req.body;

        // if (!prompt) {
        //     return res.status(400).json({ error: 'Prompt is required' });
        // }

        // const response = await axios.post(
        //     `${XAI_API_URL}/chat/completions`,
        //     {
        //         model: 'grok-2-1212',
        //         messages: [{ role: 'user', content: prompt }],
        //     },
        //     {
        //         headers: {
        //             'Authorization': `Bearer ${XAI_API_KEY}`,
        //             'Content-Type': 'application/json',
        //         },
        //     }
        // );

        return res.json({ make,model,year });
        // res.json({ response: response.data.choices[0].message.content });

    } catch (error) {
        console.error('Error fetching response from Grok:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { PredictPrice };
