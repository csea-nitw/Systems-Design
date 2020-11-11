const messagingAPI = require('./messaging_api');

const TOPIC_ID = process.env.TOPIC_ID;

function displayMessage(message) {
    console.log(`> ${message.name}: ${message.text}`);
}

function streamMessage() {
    const messagingSocket = messagingAPI.subscribe(TOPIC_ID);

    // when we get message parse and display that message
    messagingSocket.on('message', (data) => {
        const message = JSON.parse(data);
        displayMessage(message);
    });
}

streamMessage();
