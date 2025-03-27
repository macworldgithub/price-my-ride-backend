const OpenAI = require('openai');
require('dotenv').config();



const XAI_API_KEY = process.env.XAI_API_KEY;
const XAI_API_URL = process.env.XAI_API_URL;

const extractJson = (data) => {
    try {
        if (!data || !data.content) {
            throw new Error("Invalid response structure: 'content' is missing.");
        }
        console.log(data)
        const jsonMatch = data.content.match(/```json\n([\s\S]+?)\n```/);
        if (jsonMatch && jsonMatch[1]) {
            return JSON.parse(jsonMatch[1]); 
        }
        throw new Error("No valid JSON found");
    } catch (error) {
        console.error("Error extracting JSON:", error);
        return null;
    }
};





const client = new OpenAI({
    apiKey: "xai-pA9l7Tkegg7TN8mDJE6CBOyLXWRHFLgm9H23qg0ukmlo4QRTx1gUqhMkb66CSDQkdX3FFmgY9A6W2fpH",
    baseURL: "https://api.x.ai/v1",
});

const PredictPrice = async (req, res) => {
    try {
        const { make, model, year,odometer,specs } = req.body;

        if (!make) {
            return res.status(400).json({ error: 'Make is required' });
        }
        if (!model) {
            return res.status(400).json({ error: 'Model is required' });
        }
        if (!year) {
            return res.status(400).json({ error: 'Year is required' });
        }
        if (!odometer) {
            return res.status(400).json({ error: 'odometer is required' });
        }
        const completion = await client.chat.completions.create({
            model: "grok-2-latest",
            messages: [
                {
                    role: "system",
                    content: "You are an automotive pricing expert using the latest real-time market data from Australia. You retrieve accurate car pricing from online sources, dealerships, and auction listings.",
                },
                {
                    role: "user",
                    content: `Provide the most **accurate and current** price range for the following vehicle in Australia using **real-time market data**.
        
        ### **Car Details:**
        - Make: ${make}
        - Model: ${model}
        - Year: ${year}
        - Odometer: ${odometer} km
        - Additional Specs: ${specs}
        
        ### **Pricing Data Required:**
        1. **Retail Price:** Estimated price buyers pay at dealerships.
        2. **Wholesale Price:** Estimated price dealers/auction houses pay.
        
        ### **Strict Output Format (JSON Only)**  
        \`\`\`json
        {
          "make": "${make}",
          "model": "${model}",
          "year": ${year},
          "retail_price": "XXXXX - XXXXX $",
          "wholesale_price": "XXXXX - XXXXX $",
          "market_trends": "Increasing / Decreasing / Stable"
        }
        \`\`\`
        
        ### **Important Instructions:**
        - **Use only real-time Australian market data** from reputable sources (e.g., Carsales, RedBook, auction platforms, dealership listings).
        - **Ensure values are in AUD.**
        - **No explanations, comments, or additional text**—strictly return JSON.`
                },
            ],
        });
        
const extractedData = extractJson(completion.choices[0].message);
        
return res.json({
            make,
            model,
            year,
            odometer,
            specs,
            retail_price: extractedData.retail_price || "Not available",
            wholesale_price: extractedData.wholesale_price || "Not available",
            market_trends: extractedData.market_trends || "Not available",
        });

    } catch (error) {
        console.error('Error fetching response from Grok:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { PredictPrice };

