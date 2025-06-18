const express = require('express');
const { Ollama } = require("@langchain/community/llms/ollama");
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const ollama = new Ollama({
    baseUrl: "http://localhost:11434", // Default Ollama URL
    model: "qwen2.5:0.5B", // Specify the model you want to use
});

app.post('/generate', async (req, res) => {
    const prompt = req.body.prompt;
    try {
        const response = await ollama.invoke(prompt);
        res.json({ response });
    } catch (error) {
        console.error("Error generating text:", error);
        res.status(500).json({ error: "Failed to generate text" });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});