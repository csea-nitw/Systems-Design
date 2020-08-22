const axios = require('axios');
const WebSocket = require('ws');

// Publishing to a specific topicID
function publish(message, topicID) {
    return axios.post(`http://localhost:3001/${topicID}`, message);
}

// Subscribing with specific topicID endpoint with new Web Socket
function subscribe(topicID) {
    return new WebSocket(`ws://localhost:3001/${topicID}`);
}

module.exports.publish = publish;
module.exports.subscribe = subscribe;