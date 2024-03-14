const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require("cors"); // Import the cors package
require("dotenv").config();

const app = express();
app.use(express.json()); // Body parser middleware

// Use the cors middleware with specific origin
app.use(cors({ origin: "http://localhost:5173" }));

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

app.post("/api/ask", async (req, res) => {
  try {
    const { prompt } = req.body;

    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text(); // Assuming that response.text() is a synchronous method

    // Send the AI's text response back to the frontend
    res.json({ text });
  } catch (error) {
    console.error("Error generating response:", error);
    res.status(500).json({ message: "Error generating response" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
