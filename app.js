import * as dotenv from "dotenv";
import { OpenAI } from "openai";

dotenv.config();

const openai = new OpenAI({
	apiKey: process.env.OPEN_API_KEY,
});

// assistent config
//const assistant = await openai.beta.assistants.create({
//	name: "TaPas Koch",
//	instructions: "Du bist ein koch der mit wenig zutaten gute gerichte zaubert",
//	tools: [
//		{
//			type: "code_interpreter",
//		},
//	],
//	model: "gpt-3.5-turbo-16k"
//});

const assistant = await openai.beta.assistants.retrieve(
	"asst_AEUXuvM6wzra6jn0r62MUcSu"
);
//console.log(assistant);

//Threads
// Threads variable ertellen. (ID wird sichtbar im terminal) 
//const thread = await openai.beta.threads.create();

// Message variable erstellen um es an threads variable hinzuzufügen
const message = await openai.beta.threads.messages.create(
	thread.id,
	{
	  role: "user",
	  content: "I need to solve the equation `3x + 11 = 14`. Can you help me?"
	}
  );

// RUN ASSISTANT 
//const run = await openai.beta.threads.runs.create(thread.id, {	
//	assistant_id: assistant.id,
//	instructions: "Address the user as hobby Koch"
//});

// RUN ASSISTANT um den neuen status anzuzeigen von zeile 37-41 (zeile 37-41 ausklammern)
const run = await openai.beta.threads.runs.retrieve(
	"thread_djYKHVoVDgIKCuNvv3ycGPq4",
	"run_Cax9AvMJDTIhQCCxlWqO1RLA"
);

//console.log(run);

const messages = await openai.beta.threads.messages.list(
	"thread_djYKHVoVDgIKCuNvv3ycGPq4"
);

console.log(messages);

messages.body.data.forEach(message => {
	console.log(message.content);
});

const logs = await openai.beta.threads.runs.steps.list(
	"thread_djYKHVoVDgIKCuNvv3ycGPq4",
	"run_Cax9AvMJDTIhQCCxlWqO1RLA"
);


// AB HIER MUSS DIE API ANFRAGEN BEARBEITEN KÖNNEN ## FREE KONTIGENT LEER!!!!!


logs.body.data.forEach((log) => {
	console.log(log.step_details);
});
console.log(logs);

