# Key-value stores

* Relates keys to values
* Just like a Hashtable
* Flexible: no imposed types
* Caching (Redis)
    * Keys can be hash of some sort
    * IP address, username, etc
* Dynamic Configuration
    * Special parameters or constants for the system
* Eventual consistency or Strong Consistency

# Example

* Server accessing resource
  * `withoutcache`: directly to the Database and it takes 3s
  * `withcache`: directly from Redis server

## Server

* Start the server in a terminal

```
$ docker-compose up
Recreating key-value_stores_server_1 ...
Recreating key-value_stores_server_1 ... done
Attaching to key-value_stores_redis_1, key-value_stores_server_1
redis_1   | 1:C 26 Sep 2020 01:38:28.994 # oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo
redis_1   | 1:C 26 Sep 2020 01:38:28.994 # Redis version=6.0.8, bits=64, commit=00000000, modified=0, pid=1, just started
redis_1   | 1:C 26 Sep 2020 01:38:28.994 # Warning: no config file specified, using the default config. In order to specify a config file use redis-server /path/to/redis.conf
redis_1   | 1:M 26 Sep 2020 01:38:28.997 * Running mode=standalone, port=6379.
redis_1   | 1:M 26 Sep 2020 01:38:28.997 # WARNING: The TCP backlog setting of 511 cannot be enforced because /proc/sys/net/core/somaxconn is set to the lower value of 128.
redis_1   | 1:M 26 Sep 2020 01:38:28.997 # Server initialized
redis_1   | 1:M 26 Sep 2020 01:38:28.998 * Ready to accept connections
server_1  |
server_1  | > key-value-store-algo-designexpert@1.0.0 start /app
server_1  | > node server.js
server_1  |
server_1  | Listening on port 3001!
```

# Client

* Just make requests to localhost:3001

## Without Cache - 3s delay

```
$ httpstat http://localhost:3001/withoutcache/index.html

Connected to [::1]:3001

HTTP/1.1 200 OK
Content-Length: 25
Content-Type: text/html; charset=utf-8
Date: Sat, 26 Sep 2020 01:53:33 GMT
Etag: W/"19-mOQzcpdEbPcoyvEMJdi41wN0l+Q"
X-Powered-By: Express
Connection: keep-alive
Keep-Alive: timeout=5

Body discarded

   DNS Lookup   TCP Connection   Server Processing   Content Transfer
[       3ms  |           0ms  |           3016ms  |             0ms  ]
             |                |                   |                  |
    namelookup:3ms            |                   |                  |
                        connect:3ms               |                  |
                                      starttransfer:3019ms           |
                                                                 total:3020ms
```

# With Cache - First Request

* The cache will be populated as it is the first one

```
$ httpstat http://localhost:3001/withcache/index.html

Connected to [::1]:3001

HTTP/1.1 200 OK
Content-Length: 25
Content-Type: text/html; charset=utf-8
Date: Sat, 26 Sep 2020 01:55:12 GMT
Etag: W/"19-mOQzcpdEbPcoyvEMJdi41wN0l+Q"
X-Powered-By: Express
Connection: keep-alive
Keep-Alive: timeout=5

Body discarded

   DNS Lookup   TCP Connection   Server Processing   Content Transfer
[       1ms  |           0ms  |           3004ms  |             0ms  ]
             |                |                   |                  |
    namelookup:1ms            |                   |                  |
                        connect:2ms               |                  |
                                      starttransfer:3006ms           |
                                                                 total:3006ms
```

* Next requests are faster (in less than 10s)

```
$ httpstat http://localhost:3001/withcache/index.html

Connected to [::1]:3001

HTTP/1.1 200 OK
Content-Length: 25
Content-Type: text/html; charset=utf-8
Date: Sat, 26 Sep 2020 01:55:48 GMT
Etag: W/"19-mOQzcpdEbPcoyvEMJdi41wN0l+Q"
X-Powered-By: Express
Connection: keep-alive
Keep-Alive: timeout=5

Body discarded

   DNS Lookup   TCP Connection   Server Processing   Content Transfer
[       1ms  |           0ms  |              2ms  |             0ms  ]
             |                |                   |                  |
    namelookup:1ms            |                   |                  |
                        connect:2ms               |                  |
                                      starttransfer:4ms              |
                                                                 total:4ms
```

* The cache expires and so the request is slower again

```
$ httpstat http://localhost:3001/withcache/index.html

Connected to [::1]:3001

HTTP/1.1 200 OK
Content-Length: 25
Content-Type: text/html; charset=utf-8
Date: Sat, 26 Sep 2020 01:56:25 GMT
Etag: W/"19-mOQzcpdEbPcoyvEMJdi41wN0l+Q"
X-Powered-By: Express
Connection: keep-alive
Keep-Alive: timeout=5

Body discarded

   DNS Lookup   TCP Connection   Server Processing   Content Transfer
[       1ms  |           0ms  |           3002ms  |             0ms  ]
             |                |                   |                  |
    namelookup:1ms            |                   |                  |
                        connect:2ms               |                  |
                                      starttransfer:3004ms           |
                                                                 total:3004ms
```
