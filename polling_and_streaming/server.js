const express = require('express');
const expressWs= require('express-ws');

const app = express();
expressWs(app);

const messages = [{id: 0, text: 'Welcome user', username: 'chat-room'}];
const sockets = [];

app.use(express.json());

app.listen(3001, () => {
    console.log('Listening on port 3001');
});

app.get('/messages',(req, res) => {
    console.log("Current messages: " + JSON.stringify(messages))
    res.json(messages);
});

app.post('/messages', (req, res) => {
    //pshing message in message db
    const message = req.body;
    console.log("Received new message: " + JSON.stringify(message))
    messages.push(message);

    //sending message to every client
    for(const socket of sockets) {
        socket.send(JSON.stringify(message));
    }
});

//method to create a web socket
app.ws('/messages', (socket, req) => {
    console.log("Joining a new client@" + req.connection.remoteAddress)
    sockets.push(socket);

    //if client close the connection remove socket from list
    socket.on('close', () => {
        sockets.splice(sockets.indexOf(socket), 1);
    });
});
