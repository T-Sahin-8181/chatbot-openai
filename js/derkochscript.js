"use strict";


const inputEl = document.querySelector(".input-chat");
const btnEl = document.querySelector(".fa-paper-plane");
const cardBodyEl = document.querySelector(".card-body");

let userMessage;
const API_KEY = "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";
const URL = "https://api.openai.com/v1/chat/completions";

const chatGenerator = (robot) => {
    robot = robot.querySelector(".robot");
    const requestBody = {
        model: "gpt-3.5-turbo",
        messages: [{"role": "system", "content": "You are a helpful assistant."}, {"role": "user", "content": userMessage}],
        temperature: 0.7
    };

    const requestOption = {
        method: "POST",
        headers: {
            "Content-Type": "application/json", // Hier wurde der Header korrigiert
            Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify(requestBody), // Body der Anfrage verwendet jetzt die korrekte Struktur und Variable
    };

    fetch(URL, requestOption)
        .then((res) => res.json())
        .then((data) => {
            robot.textContent = data.choices[0].message.content;
        })
        .catch((error) => {
            console.error("Fehler beim Anfordern der Chat-Antwort:", error);
            robot.textContent = "Es gab leider ein Problem beim Laden der Antwort.";
        });
};



// manage chat
function manageChat() {
    userMessage = inputEl.value.trim();

    if (!userMessage) return;
    inputEl.value = "";    

    cardBodyEl.appendChild(messageEl(userMessage, "user"));

    setTimeout(() => {
        const robotMessage = messageEl("Ich schicke dir gleich etwas Köstliches zu, Augenblick bitte. . .", "chat-bot");
        cardBodyEl.append(robotMessage);
        chatGenerator(robotMessage);
    }, 600);
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
