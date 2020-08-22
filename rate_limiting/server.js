const database = require('./database');
const express = require('express');
const app = express();

app.listen(3000, () => console.log("Listening on port 3000."));

// keep a hash table of the prvious access time for each user
const accesses = {};

app.get('/index.html', function(req, res) {
    const {user} = req.headers;
    if(user in accesses) {
        const previosAccessTime = accesses[user];
    
    // Limit to 1 request every 5 seconds.
        if (Date.now() - previosAccessTime <5000) {
         res.status(429).send('Too many requests.\n');
         return;
        }
    }

    // Server thepage and store the access time
    database.get('index.html', page => {
        accesses[user] = Date.now();
        res.send(page + '\n');
    });
});