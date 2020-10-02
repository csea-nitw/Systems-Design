const express = require('express');
const expressWs = require('express-ws');

const app = express();
expressWs(app);

const sockets = {};

app.use(express.json());

const SERVER_PORT = process.env.SERVER_PORT ? process.env.SERVER_PORT : 3001;

app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}.`));

app.post('/:topicID', (req, res) => {
    const {topicID} = req.params;

    const message = req.body;

    const topicSockets = sockets[topicID] || [];

    //sending message to all the sockets
    for (const socket of topicSockets) {
        socket.send(JSON.stringify(message));
    }
});

app.ws('/:topicID', (socket, req) =>{
    const {topicID} = req.params;

    console.log(`Subscribed new client on topic ${topicID}`);

    if(!sockets[topicID]) sockets[topicID] = [];
    
    const topicSockets = sockets[topicID];
    //adding new created socket to topicSockets
    topicSockets.push(socket);

    //when socket closes the connection just remove it 
    socket.on('close', () => {
        topicSockets.splice(topicSockets.indexOf(socket), 1);
    });
});
