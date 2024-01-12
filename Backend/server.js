const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');

require('dotenv').config();
const app = express();
const port = 3000;

// Nur einmal definieren und vor den Routen
app.use(express.json());
app.use(cors());

// Initialisieren von openai mit dem API-Key aus der .env-Datei
const openai = new OpenAI(process.env.OPENAI_API_KEY);

app.post('/chat', (req, res) => {
    try {
        const userMessage = req.body.message;

        const response = openai.createCompletion({
            model: "gpt-3.5-turbo",
            prompt: userMessage,
            max_tokens: 150,
            temperature: 0.7,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0
        });


        res.json({ reply: response.data.choices[0].text });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ein Fehler ist aufgetreten' });
    }
});

app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});