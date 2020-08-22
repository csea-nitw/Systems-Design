const helpers = require('./helper');
const messagingAPI = require('./messaging_api');
const readline = require('readline');

const displayMessages = {};

const terminal = readline.createInterface({
    input: process.stdin,
});

terminal.on('line', text => {
    const username = process.env.NAME;
    const id = helpers.getRandomInt(100000);
    //as we enter a message it's already displayed in the chat so making it true
    displayMessages[id] = true;

    const message = {id, text, username};
    messagingAPI.sendMessage(message);
});

function displayMessage(message) {
    console.log(`> ${message.username}: ${message.text}`);
    displayMessages[message.id] = true;
}

async function getAndDisplayMessages() {   
    const messages = await messagingAPI.getMessages();

    for (const message of messages) {
        const messageAlreadyDisplayed = message.id in displayMessages;
        if (!messageAlreadyDisplayed) displayMessage(message);
    }
}

function pollMessages() {
    setInterval(getAndDisplayMessages, 3000);
}

function streamMessages() {
    const messagingSocket = messagingAPI.createMessagingSocket();

    messagingSocket.on('message', data => {
        const message = JSON.parse(data);
        const messageAlreadyDisplayed = message.id in displayMessages;
        if (!messageAlreadyDisplayed) displayMessage(message);
    });
}

if(process.env.MODE === 'poll') {
    // when you join chat room first it will get all the messages and then start polling
    getAndDisplayMessages();
    pollMessages();
} else if (process.env.MODE === 'stream') {
    // when you join chat room first it will get all the messages and then start streaming   
    getAndDisplayMessages();
    streamMessages();
}



/* Commands to run
MODE=stream NAME=Divas node client.js
MODE=poll NAME=Shaffy node client.js
(for i in `seq 1 10000; do sleep 1; echo $i; done) | (optional: MODE=poll/stream) NAME=Bot node client.js
*/