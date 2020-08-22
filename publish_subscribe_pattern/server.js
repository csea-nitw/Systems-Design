const express = require('express');
const expressWs = require('express-ws');

const app = express();
expressWs(app);

const sockets = {};

app.use(express.json());

app.listen(3001, () => console.log("Listening on port 3001."));


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

    if(!sockets[topicID]) sockets[topicID] = [];
    
    const topicSockets = sockets[topicID];
    //adding new created socket to topicSockets
    topicSockets.push(socket);


    //when socket closes the connection just remove it 
    socket.on('close', () => {
        topicSockets.splice(topicSockets.indexOf(socket), 1);
    });

});