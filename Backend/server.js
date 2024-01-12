const fs = require('fs');
// Express importieren
const express = require('express');

// Express initialisieren
const app = express();

// Port definieren (optional)
const port = 3000;

// CORS (Cross Origin Ressource Sharing) aktivieren
const cors = require('cors');

//dotenv package initialisieren
require('dotenv').config()


// Debug-Ausgabe für Umgebung
if (process.env.ENABLE_DEBUG == "TRUE") {
    console.log("env:", process.env);
}

// Imprting and setting up the OpenAI client


// CORS Options definieren
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// Express mit Json Req/Res aktivieren
app.use(express.json(), cors(corsOptions));

console.log("env:", process.env);
// GET Route um eine Liste aller Einträge zu erhalten
app.post('/chat', (req, res) => {
            res.json({ "chat": "chat"});
});





// localhost listen port app 
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
