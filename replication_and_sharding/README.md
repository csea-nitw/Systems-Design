# Replication and Sharding

* Replication: replicating the main database when the main server becomes overloaded, avoid a single point of failure.
* Sharding: strategy to split the data based on a key
  * Can use consistent hashing to minimize the number of servers update when a server dies

> NOTE: There were some modifications to the original code of the proxy!

# Example

* Sharding example of 2 servers based on a key value
* Database values are written to the local dir `$(pwd)/data/aedb_data_x`

> NOTE: Requires docker-compose to run them all... See all the pieces together in the file.
> Docker-compose networking allows us to use the name of the service instead of localhost, as containers are isolated in a private network.

## Start Servers

* 2 aedbs and 1 reverse_proxy server that knows where to proxy

```
$ docker-compose up --build
WARNING: Found orphan containers (replication_and_sharding_base_1) for this project. If you removed or renamed this service in your compose file, you can run this command with the --remove-orphans flag to clean it up.
Building aedb_0
Step 1/9 : FROM node:14.11.0-alpine3.12
 ---> 75553673d3f9
Step 2/9 : WORKDIR /app
 ---> Using cache
 ---> 257c683aa69b
Step 3/9 : COPY package.json .
 ---> Using cache
 ---> 5515d1118c44
Step 4/9 : RUN npm install --production
 ---> Using cache
 ---> e4bed754c7df
Step 5/9 : COPY aedb_proxy.js .
 ---> Using cache
 ---> 96ec63d3a9e0
Step 6/9 : COPY aedb.js .
 ---> Using cache
 ---> 6843ed271ad0
Step 7/9 : VOLUME /aedb/shards
 ---> Running in b84a9956b082
Removing intermediate container b84a9956b082
 ---> bc2d21d5eb2a
Step 8/9 : ENTRYPOINT ["npm"]
 ---> Running in 41936e320c48
Removing intermediate container 41936e320c48
 ---> 83189157c43d
Step 9/9 : CMD ["run", "db"]
 ---> Running in dd6dd72869fb
Removing intermediate container dd6dd72869fb
 ---> 96aafc0493ac

Successfully built 96aafc0493ac
Successfully tagged marcellodesales/systemsexpert-sharding-db:latest
Building aedb_1
Step 1/9 : FROM node:14.11.0-alpine3.12
 ---> 75553673d3f9
Step 2/9 : WORKDIR /app
 ---> Using cache
 ---> 257c683aa69b
Step 3/9 : COPY package.json .
 ---> Using cache
 ---> 5515d1118c44
Step 4/9 : RUN npm install --production
 ---> Using cache
 ---> e4bed754c7df
Step 5/9 : COPY aedb_proxy.js .
 ---> Using cache
 ---> 96ec63d3a9e0
Step 6/9 : COPY aedb.js .
 ---> Using cache
 ---> 6843ed271ad0
Step 7/9 : VOLUME /aedb/shards
 ---> Using cache
 ---> bc2d21d5eb2a
Step 8/9 : ENTRYPOINT ["npm"]
 ---> Using cache
 ---> 83189157c43d
Step 9/9 : CMD ["run", "db"]
 ---> Using cache
 ---> 96aafc0493ac

Successfully built 96aafc0493ac
Successfully tagged marcellodesales/systemsexpert-sharding-db:latest
Building reverse_proxy
Step 1/9 : FROM node:14.11.0-alpine3.12
 ---> 75553673d3f9
Step 2/9 : WORKDIR /app
 ---> Using cache
 ---> 257c683aa69b
Step 3/9 : COPY package.json .
 ---> Using cache
 ---> 5515d1118c44
Step 4/9 : RUN npm install --production
 ---> Using cache
 ---> e4bed754c7df
Step 5/9 : COPY aedb_proxy.js .
 ---> Using cache
 ---> 96ec63d3a9e0
Step 6/9 : COPY aedb.js .
 ---> Using cache
 ---> 6843ed271ad0
Step 7/9 : VOLUME /aedb/shards
 ---> Using cache
 ---> bc2d21d5eb2a
Step 8/9 : ENTRYPOINT ["npm"]
 ---> Using cache
 ---> 83189157c43d
Step 9/9 : CMD ["run", "db"]
 ---> Using cache
 ---> 96aafc0493ac

Successfully built 96aafc0493ac
Successfully tagged marcellodesales/systemsexpert-sharding-db:latest
Recreating replication_and_sharding_aedb_1_1        ... done
Recreating replication_and_sharding_reverse_proxy_1 ... done
Recreating replication_and_sharding_aedb_0_1        ... done
Attaching to replication_and_sharding_aedb_0_1, replication_and_sharding_reverse_proxy_1, replication_and_sharding_aedb_1_1
aedb_0_1         |
aedb_0_1         | > key-value-store-algo-designexpert@1.0.0 db /app
aedb_0_1         | > node aedb.js
aedb_0_1         |
reverse_proxy_1  |
reverse_proxy_1  | > key-value-store-algo-designexpert@1.0.0 proxy /app
reverse_proxy_1  | > node aedb_proxy.js
reverse_proxy_1  |
aedb_1_1         |
aedb_1_1         | > key-value-store-algo-designexpert@1.0.0 db /app
aedb_1_1         | > node aedb.js
aedb_1_1         |
aedb_0_1         | Listening on port 3000
aedb_1_1         | Listening on port 3001
reverse_proxy_1  | Listening on port 8000!
reverse_proxy_1  | Forwarding to: http://aedb_1:3001/a
aedb_1_1         | Storing data at key a.
reverse_proxy_1  | Forwarding to: http://aedb_0:3000/b
aedb_0_1         | Storing data at key b.
reverse_proxy_1  | Forwarding to: http://aedb_1:3001/mykey
aedb_1_1         | Storing data at key mykey.
reverse_proxy_1  | Forwarding to: http://aedb_1:3001/marcello
aedb_1_1         | Storing data at key marcello.
reverse_proxy_1  | Forwarding to: http://aedb_1:3001/cool
aedb_1_1         | Storing data at key cool.
reverse_proxy_1  | Forwarding to: http://aedb_0:3000/present
aedb_0_1         | Storing data at key present.
reverse_proxy_1  | Forwarding to: http://aedb_0:3000/present2
aedb_0_1         | Storing data at key present2.
reverse_proxy_1  | Forwarding to: http://aedb_0:3000/present23
aedb_0_1         | Storing data at key present23.
reverse_proxy_1  | Forwarding to: http://aedb_0:3000/present23
aedb_0_1         | Retrieving data from key present23.
reverse_proxy_1  | Forwarding to: http://aedb_0:3000/present23
aedb_0_1         | Retrieving data from key present23.
reverse_proxy_1  | Forwarding to: http://aedb_1:3001/a
aedb_1_1         | Retrieving data from key a.
````

# POST keys

* The commands below were executed to get the shards updated.

```
$ curl --header 'content-type: application/json' --data '{"data": "This is some data."}' localhost:8000/a
$ curl --header 'content-type: application/json' --data '{"data": "This is some data."}' localhost:8000/a
$ curl --header 'content-type: application/json' --data '{"data": "This is some data."}' localhost:8000/b
$ curl --header 'content-type: application/json' --data '{"data": "This is some data."}' localhost:8000/mykey
$ curl --header 'content-type: application/json' --data '{"data": "This is some data."}' localhost:8000/marcello
$ curl --header 'content-type: application/json' --data '{"data": "This is some data."}' localhost:8000/cool
$ curl --header 'content-type: application/json' --data '{"data": "This is some data."}' localhost:8000/present
$ curl --header 'content-type: application/json' --data '{"data": "This is some data."}' localhost:8000/present2
$ curl --header 'content-type: application/json' --data '{"data": "This is some data."}' localhost:8000/present23
```

# GET keys

```
$ curl -i -w "\n" localhost:8000/present23
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: text/html; charset=utf-8
Content-Length: 18
ETag: W/"12-i+XBMOXnM+ggrC17zBPt0P6+BtU"
Date: Sun, 27 Sep 2020 22:21:25 GMT
Connection: keep-alive
Keep-Alive: timeout=5

This is some data.

$ curl -i -w "\n" localhost:8000/a
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: text/html; charset=utf-8
Content-Length: 18
ETag: W/"12-i+XBMOXnM+ggrC17zBPt0P6+BtU"
Date: Sun, 27 Sep 2020 22:22:15 GMT
Connection: keep-alive
Keep-Alive: timeout=5

This is some data.
```
