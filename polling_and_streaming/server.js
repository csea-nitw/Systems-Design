const express = require('express');
const expressWs= require('express-ws');

const app = express();
expressWs(app);

const messages = [{id: 0, text: 'Welcome', username: 'Chat Room'}];
const sockets = [];

app.use(express.json());

app.listen(3001, () => {
    console.log('Listening on port 3001');
});

app.get('/messages',(req, res) => {
    res.json(messages);
});

app.post('/messages', (req, res) => {
    //pshing message in message db
    const message = req.body;
    messages.push(message);

    //sending message to every client
    for(const socket of sockets) {
        socket.send(JSON.stringify(message));
    }
});

//method to create a web socket
app.ws('/messages', socket => {
    sockets.push(socket);

    //if client close the connection remove socket from list
    socket.on('close', () => {
        sockets.splice(sockets.indexOf(socket), 1);
    });
});
