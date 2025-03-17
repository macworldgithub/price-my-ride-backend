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
// console.log(XAI_API_KEY,XAI_API_URL)

const PredictPrice = async (req, res) => {
    try {
        const { make, model, year } = req.body;

        if (!make) {
            return res.status(400).json({ error: 'Make is required' });
        }
        if (!model) {
            return res.status(400).json({ error: 'Model is required' });
        }
        if (!year) {
            return res.status(400).json({ error: 'Year is required' });
        }

        const completion = await client.chat.completions.create({
            model: "grok-2-latest",
            messages: [
                {
                    role: "system",
                    content: "You are an expert in automotive pricing, using up-to-date Australian market data from RedBook, CarsGuide, Cox Automotive, and auction listings.",
                },
                {
                    role: "user",
                    content: `I need an accurate estimation of the retail and wholesale price for a car in Australia based on its details. Please use the latest market data from **RedBook, CarsGuide, Cox Automotive, and auction listings** to provide the best estimate. 

Car Details:
- Make: ${make}
- Model: ${model}
- Year: ${year}

Requirements:
1. **Retail Price:** Estimated price buyers pay at dealerships.
2. **Wholesale Price:** Estimated price dealers/auction houses pay.
3. **Source Validation:** Mention which sources were used.
4. **Market Trends:** Indicate if the prices are increasing, decreasing, or stable.

NOTE:
I DO NOT NEED ANY EXPLAINATION IN THE OUTPUT I ONLY WANT THIS JSON IN OUTPUT NO OTHER TEXT
FOLLWOING IS THE OUTPUT JSON FORMAT
### **Output Format (JSON):**  
\`\`\`json
{
  "make": "${make}",
  "model": "${model}",
  "year": ${year},
  "retail_price": "XXXXX AUD",
  "wholesale_price": "XXXXX AUD",
  "source": "List of sources used",
  "market_trends": "Increasing / Decreasing / Stable"
}
\`\`\`

Ensure all prices are in **Australian Dollars (AUD)** and reflect the latest market conditions.`,

                },
            ],
        });
const extractedData = extractJson(completion.choices[0].message);
console.log(extractedData);
        return res.json({
            make,
            model,
            year,
            retail_price: extractedData.retail_price || "Not available",
            wholesale_price: extractedData.wholesale_price || "Not available",
            source: extractedData.source || "Not specified",
            market_trends: extractedData.market_trends || "Not available",
        });

    } catch (error) {
        console.error('Error fetching response from Grok:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { PredictPrice };

