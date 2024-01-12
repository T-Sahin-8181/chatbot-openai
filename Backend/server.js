const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const port = 3000;
const openai = new OpenAI(process.env.OPENAI_API_KEY);

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

    try{
    const completion = await openai.chat.completions.create({
        messages: [
        {
          role: "system",
          content: "You are a helpful assistant designed to output JSON.",
        },
        { role: "user", content: "" +userMessage,},
       
         ],
        model: "gpt-3.5-turbo-1106",
        response_format: { type: "json_object" },
    });
    console.log(completion.choices[0].message.content);
    
    res.json({ reply: response.data.choices[0].text });
    } catch (error) {
    console.error('OpenAI error:', error);
    res.status(500).json({ error: 'Ein Fehler ist aufgetreten' });
    }
   
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});