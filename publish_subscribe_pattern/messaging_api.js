const axios = require('axios');
const WebSocket = require('ws');

const SERVER_HOST = process.env.SERVER_HOST ? process.env.SERVER_HOST : "localhost";
const SERVER_PORT = process.env.SERVER_PORT ? process.env.SERVER_PORT : 3001;

console.log(`SUBSCRIBER SERVER:PORT POINTS TO MSG SERVER ${SERVER_HOST}:${SERVER_PORT}`);

// Publishing to a specific topicID
function publish(message, topicID) {
    return axios.post(`http://${SERVER_HOST}:${SERVER_PORT}/${topicID}`, message);
}

// Subscribing with specific topicID endpoint with new Web Socket
function subscribe(topicID) {
    return new WebSocket(`ws://${SERVER_HOST}:${SERVER_PORT}/${topicID}`);
}

module.exports.publish = publish;
module.exports.subscribe = subscribe;
