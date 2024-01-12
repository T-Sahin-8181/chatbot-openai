// derkoch.js
const inputEl = document.querySelector(".input-chat"); // Angenommen, dies ist das richtige Selektor für dein Eingabefeld
const btnEl = document.querySelector(".send-button"); // Angenommen, dies ist der Selektor für deinen Senden-Button

function manageChat() {
  const userMessage = inputEl.value.trim();
  if (!userMessage) return;

  fetch("http://localhost:3000/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message: userMessage })
  })
  .then(response => response.json())
  .then(data => {
    // Hier würdest du die Antwort anzeigen, Zum Beispiel:
    console.log(data.reply);
  })
  .catch(error => {
    // Hier würdest du den Fehler behandeln, zum Beispiel:
    console.error('Fehler beim Senden der Nachricht:', error);
  });

  // Leere das Eingabefeld und setze den Fokus zurück darauf
  inputEl.value = '';
  inputEl.focus();
}

//btnEl.addEventListener('click', manageChat);
