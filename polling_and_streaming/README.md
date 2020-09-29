# POOLING AND STREAMING

* Polling: act of fetching a resource or piece of data regularly at an interval to make sure your data is not too stable
    * At every x seconds, clients issue requests at some interval to the Server for data
    * Limitations: For chat apps, we can’t poll everything all the time without taking resources

* Streaming: in networking, it usually refers to the act of continuously getting a feed of information from a server by keeping an open connection between the two machines or processes
    * Instead of having clients to repeat requests, clients open a long-lived request using a socket
    * Socket: a kind of file that acts like a stream. Processes can read and write to sockets and communicate in this manner. Most of the time the sockets are fronts for TCP connection while on hosts in a Cient-Server model.
    * Allows clients to continuously receive messages from the server
    * Instantaneous experience by clients  

# Technologies

* Websocket
* HTTP/2 Streaming

# Server

* Start the server with the following...

```
$ docker-compose -f docker-compose-server.yaml up --build
WARNING: Found orphan containers (polling_and_streaming_client_1, polling_and_streaming_chat_clie.
Building chat_server
Step 1/10 : FROM node:14.11.0-alpine3.12
 ---> 75553673d3f9
Step 2/10 : WORKDIR /app
 ---> Using cache
 ---> 257c683aa69b
Step 3/10 : COPY package.json .
 ---> Using cache
 ---> f06eeaca9046
Step 4/10 : RUN npm install --production
 ---> Using cache
 ---> 2f2669185f93
Step 5/10 : COPY client.js .
 ---> 85bd8e0a9907
Step 6/10 : COPY server.js .
 ---> 381ab8bf7b31
Step 7/10 : COPY messaging_api.js .
 ---> 0c1468a2dfac
Step 8/10 : COPY helper.js .
 ---> 3346bd691e32
Step 9/10 : ENTRYPOINT ["npm"]
 ---> Running in 9089c18def71
Removing intermediate container 9089c18def71
 ---> d9390e52c673
Step 10/10 : CMD ["run", "db"]
 ---> Running in 62b3b03129ef
Removing intermediate container 62b3b03129ef
 ---> c556aebe47e9

Successfully built c556aebe47e9
Successfully tagged marcellodesales/systemsexpert-polling-streaming:latest
Recreating polling_and_streaming_chat_server_1 ... done
Attaching to polling_and_streaming_chat_server_1
chat_server_1  |
chat_server_1  | > polling-streaming-algo-designexpert@1.0.0 server /app
chat_server_1  | > node server.js
chat_server_1  |
chat_server_1  | Listening on port 3001
chat_server_1  | Joining a new client@::ffff:192.168.32.3
chat_server_1  | Current messages: [{"id":0,"text":"Welcome user","username":"chat-room"}]
chat_server_1  | Received new message: {"id":529,"text":"OI... alguem ai","username":"marcello"}
chat_server_1  | Joining a new client@::ffff:192.168.32.4
chat_server_1  | Current messages: [{"id":0,"text":"Welcome user","username":"chat-room"},{"id":5]
chat_server_1  | Joining a new client@::ffff:192.168.32.5
chat_server_1  | Current messages: [{"id":0,"text":"Welcome user","username":"chat-room"},{"id":5]
chat_server_1  | Received new message: {"id":77213,"text":"tudo bem?","username":"leandro"}
chat_server_1  | Joining a new client@::ffff:192.168.32.5
chat_server_1  | Current messages: [{"id":0,"text":"Welcome user","username":"chat-room"},{"id":529,"text":"OI... alguem ai","username":"marcello"},{"id":77213,"text":"tudo bem?","username":"leandr]
chat_server_1  | Received new message: {"id":1113,"text":"e com vcs?","username":"bot"}
chat_server_1  | Received new message: {"id":93787,"text":"Rapaz aqui ta bom","username":"bot"}
chat_server_1  | Received new message: {"id":28263,"text":"como?","username":"leandro"}
chat_server_1  | Received new message: {"id":4219,"text":"sim?","username":"marcello"}
```

# Start the clients

After dockering the solution, you need to use the name of the chat_server according to docker-compose. Since the container is in an isolated network, you need to join it (`--network`).

* Client with Poll mode

```
$ docker run -ti --rm -e MODE=poll -e NAME=leandro -e WS_SERVER_HOST_PORT=chat_server:3001 --network=streaming marcellodesales/systemsexpert-polling-streaming run client

> polling-streaming-algo-designexpert@1.0.0 client /app
> node client.js

> chat-room: Welcome user
> marcello: OI... alguem ai
> leandro: tudo bem?
> bot: e com vcs?
> bot: Rapaz aqui ta bom
> leandro: como?
> marcello: sim?
> superbot: 1
> superbot: 2
```

* Client with Streaming mode

```
$ docker run --rm -ti -e MODE=stream -e NAME=marcello -e WS_SERVER_HOST_PORT=chat_server:3001
     --network=streaming marcellodesales/systemsexpert-polling-streaming run client

> polling-streaming-algo-designexpert@1.0.0 client /app
> node client.js

> chat-room: Welcome user
OI... alguem ai
> leandro: tudo bem?
> bot: e com vcs?
> bot: Rapaz aqui ta bom
> leandro: como?
sim?
> superbot: 1
> superbot: 2
```

* Client with Streaming Bot: You need to exec into a container before generating all the numbers to be submitted to see the experiment
  * All streaming clients get the messages at the same time
  * All polling clients get the messages at every 3 seconds in chunks. (Not a good user experience)

> NOTE: Within the container, the bot client is NOT showing each number being sent to the clients
```
$ docker run -ti --rm --entrypoint sh -e MODE=stream -e NAME=bot -e WS_SERVER_HOST_PORT=chat_server:3001 --network=streaming marcellodesales/systemsexpert-polling-streaming
/app #

/app # (for i in `seq 1 10000`; do sleep 1; echo $i; done) | NAME=superbot node client.js
> chat-room: Welcome user
> marcello: OI... alguem ai
> leandro: tudo bem?
> bot: e com vcs?
> bot: Rapaz aqui ta bom
> leandro: como?
> marcello: sim?
```
