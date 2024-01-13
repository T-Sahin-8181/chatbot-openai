// derkoch.js
const inputEl = document.querySelector(".input-chat");
const btnEl = document.querySelector(".send-button"); // Ersetze .send-button durch den korrekten Selektor für den Senden-Button in deinem HTML
const cardBodyEl = document.querySelector(".card-body");

function manageChat() {
      const userMessage = inputEl.value.trim();
      if (!userMessage) { 
       return; // Wenn keine Eingabe vorhanden ist, kehre sofort zurück
    }

        // Füge die Nachricht des Benutzers zum Chatfenster hinzu
        const userMessageElement = messageEl(userMessage, "user");
     cardBodyEl.appendChild(userMessageElement);

        // Sende die Benutzernachricht an das Backend
    fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: userMessage })
    })
    .then(response => response.json())
    .then(data => {
         // Verwende data.reply oder einen anderen geeigneten Schlüssel, um auf das Textfeld in der Antwort zuzugreifen
        const robotMessageElement = messageEl(data.reply, "chat-bot"); // oder data.response, abhängig von der Struktur des JSON-Objekts
        cardBodyEl.appendChild(robotMessageElement);
        inputEl.value = ''; // Leert das Eingabefeld
        inputEl.focus(); // Setzt den Fokus zurück auf das Eingabefeld
    })
    .catch(error => {
        console.error('Fehler beim Senden der Nachricht:', error);
    });

        // Leere das Eingabefeld und setze den Fokus zurück darauf
        inputEl.value = '';
        inputEl.focus();
    }

    // Helper-Funktion, um Chat-Nachrichten zu erzeugen
    function messageEl(message, className) {
        const chatEl = document.createElement("div");
        chatEl.className = "chat " + className;
        const chatContent = className === "chat-bot"
        ? `<span class="user-icon"><i class="fa fa-robot"></i></span><p class='robot'>${message}</p>`
        : `<span class="user-icon"><i class="fa fa-user"></i></span><p>${message}</p>`;
        chatEl.innerHTML = chatContent;
        return chatEl;
    }



    // Event-Listener zum Textfeld hinzufügen, um auf Enter-Taste zu reagieren
    inputEl.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
        event.preventDefault();
        manageChat();
    }
    });
    inputEl.addEventListener('click', function(event) {
        if (event.key === 'click') {
        event.preventDefault();
        manageChat();
    }
});
