const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const role_content = process.env.role_content
const konfig_chat = process.env.konfig_chat;
const port = process.env.PORT;
const openai = new OpenAI(process.env.OPENAI_API_KEY);

    
app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;
 console.log(userMessage);
    try{
    const completion = await openai.chat.completions.create({
        messages: [
        {
          role: "system",
          content: role_content
        },
        { role: "user",
         content: konfig_chat +userMessage,},       
         ],
        model: "gpt-3.5-turbo-1106",
        response_format: { type: "text" },
    });
    console.log(completion.choices[0].message.content);
    
    res.json({ reply: completion.choices[0].message.content });
    } catch (error) {
    console.error('OpenAI error:', error);
    res.status(500).json({ error: 'Ein Fehler ist aufgetreten' });
    }
   
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});