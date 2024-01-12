"use strict";

const inputEl = document.querySelector(".input-chat");
const btnEl = document.querySelector(".fa-paper-plane");
const cardBodyEl = document.querySelector(".card-body");

let userMessage;
// const API_KEY = 
const URL = "https://api.openai.com/v1/chat/completions";


"use strict";

// ... (restlichen Code behalten)

function chatGenerator(robot) {
    userMessage = inputEl.value.trim();
    if (!userMessage) return;
    
    // Die Nachricht an den Backend-Server
    const requestBody = {
        message: userMessage
    };

    const requestOption = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody)
    };

    // Anfrage an den Backend-Server
    fetch("http://localhost:3000/chat", requestOption)
        .then((res) => res.json())
        .then((data) => {
            robot.textContent = data.reply;
        })
        .catch((error) => {
            console.error("Fehler beim Anfordern der Chat-Antwort:", error);
            robot.textContent = "Es gab leider ein Problem beim Laden der Antwort.";
        });
}


// manage chat
function manageChat() {
    userMessage = inputEl.value.trim();

    if (!userMessage) return;
    inputEl.value = "";    

    cardBodyEl.appendChild(messageEl(userMessage, "user"));

    setTimeout(() => {
        const robotMessage = messageEl("Augenblick bitte. . .", "chat-bot");
        cardBodyEl.append(robotMessage);
        chatGenerator(robotMessage);
    }, 100);
}


//messages 
const messageEl = (message, className) =>{
    const chatEl = document.createElement("div");
    chatEl.classList.add("chat", `${className}`);
    let chatContent = 
        className === "chat-bot"
            ? `<span class="user-icon"><i class="fa fa-robot"></i></span>
    <p class='robot'>${message}</p>`
            : ` <span class="user-icon"><i class="fa fa-user"></i></span>
    <p>${message}</p>`;
    chatEl.innerHTML = chatContent;
    return chatEl;
};



btnEl.addEventListener("click", manageChat);
