const axios = require('axios');
const webSocket = require('ws');

const WS_SERVER_HOST_PORT = process.env.WS_SERVER_HOST_PORT

function createMessagingSocket() {
    return new webSocket('ws://' + WS_SERVER_HOST_PORT + '/messages');
}

function getMessages() {
    return axios.get('http://' + WS_SERVER_HOST_PORT + '/messages').then(res => res.data);
}

function sendMessage(message) {
    return axios.post('http://' + WS_SERVER_HOST_PORT + '/messages' , message);
}

module.exports.createMessagingSocket = createMessagingSocket;
module.exports.getMessages = getMessages;
module.exports.sendMessage = sendMessage;
