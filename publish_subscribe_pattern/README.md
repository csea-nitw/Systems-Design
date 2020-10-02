# Publish/Subscriber 

* Pattern to decouple systems 

# Server 

* Start the server with the subscriber to the topics

```
$ docker-compose -f docker-compose-server.yaml up
WARNING: Found orphan containers (publish_subscribe_pattern_server_1, publish_subscribe_pattern_news_alert_subscriber_1_1) for this project. If you removed or renamed this service in your compose file, you can run this command with the --remove-orphans flag to clean it up.
Starting publish_subscribe_pattern_prices_subscriber_2_1 ... done
Starting publish_subscribe_pattern_prices_subscriber_1_1 ... done
Starting publish_subscribe_pattern_news_subscriber_1_1   ... done
Starting publish_subscribe_pattern_pubsub_server_1       ... done
Attaching to publish_subscribe_pattern_prices_subscriber_1_1, publish_subscribe_pattern_prices_subscriber_2_1, publish_subscribe_pattern_pubsub_server_1, publish_subscribe_pattern_news_subscriber_1_1
prices_subscriber_2_1  | wait-for-it.sh: waiting 15 seconds for pubsub_server:3001
prices_subscriber_1_1  | wait-for-it.sh: waiting 15 seconds for pubsub_server:3001
news_subscriber_1_1    | wait-for-it.sh: waiting 15 seconds for pubsub_server:3001
pubsub_server_1        |
pubsub_server_1        | > publisher-subscriber-algo-designexpert@1.0.0 server /app
pubsub_server_1        | > node server.js
pubsub_server_1        |
pubsub_server_1        | Listening on port 3001.
prices_subscriber_1_1  | wait-for-it.sh: pubsub_server:3001 is available after 1 seconds
prices_subscriber_2_1  | wait-for-it.sh: pubsub_server:3001 is available after 1 seconds
news_subscriber_1_1    | wait-for-it.sh: pubsub_server:3001 is available after 1 seconds
prices_subscriber_1_1  |
prices_subscriber_1_1  | > publisher-subscriber-algo-designexpert@1.0.0 subscriber /app
prices_subscriber_1_1  | > node subscriber.js
prices_subscriber_1_1  |
prices_subscriber_2_1  |
prices_subscriber_2_1  | > publisher-subscriber-algo-designexpert@1.0.0 subscriber /app
prices_subscriber_2_1  | > node subscriber.js
prices_subscriber_2_1  |
news_subscriber_1_1    |
news_subscriber_1_1    | > publisher-subscriber-algo-designexpert@1.0.0 subscriber /app
news_subscriber_1_1    | > node subscriber.js
news_subscriber_1_1    |
prices_subscriber_1_1  | SUBSCRIBER SERVER:PORT POINTS TO MSG SERVER pubsub_server:3001
pubsub_server_1        | Subscribed new client on topic stock_prices
prices_subscriber_2_1  | SUBSCRIBER SERVER:PORT POINTS TO MSG SERVER pubsub_server:3001
pubsub_server_1        | Subscribed new client on topic stock_prices
news_subscriber_1_1    | SUBSCRIBER SERVER:PORT POINTS TO MSG SERVER pubsub_server:3001
pubsub_server_1        | Subscribed new client on topic news_alert
prices_subscriber_1_1  | > STOCK_BROKER: 1
prices_subscriber_2_1  | > STOCK_BROKER: 1
prices_subscriber_1_1  | > STOCK_BROKER: 2
prices_subscriber_2_1  | > STOCK_BROKER: 2
prices_subscriber_1_1  | > STOCK_BROKER: 3
prices_subscriber_2_1  | > STOCK_BROKER: 3
prices_subscriber_1_1  | > STOCK_BROKER: 4
prices_subscriber_2_1  | > STOCK_BROKER: 4
prices_subscriber_1_1  | > STOCK_BROKER: 5
prices_subscriber_2_1  | > STOCK_BROKER: 5
prices_subscriber_2_1  | > STOCK_BROKER: 6
prices_subscriber_1_1  | > STOCK_BROKER: 6
prices_subscriber_2_1  | > STOCK_BROKER: 7
prices_subscriber_1_1  | > STOCK_BROKER: 7
prices_subscriber_1_1  | > STOCK_BROKER: 8
prices_subscriber_2_1  | > STOCK_BROKER: 8
news_subscriber_1_1    | > NEWS_NEWS: 1
news_subscriber_1_1    | > NEWS_NEWS: 2
news_subscriber_1_1    | > NEWS_NEWS: 3
news_subscriber_1_1    | > NEWS_NEWS: 4
news_subscriber_1_1    | > NEWS_NEWS: 5
news_subscriber_1_1    | > NEWS_NEWS: 6
```

# Client

* Use the subscriber using a container.

```
$ docker run -ti -e NAME=STOCK_BROKER -e SERVER_HOST=pubsub_server -e SERVER_PORT=3001 -e TOPIC_ID=stock_prices --network=pubsub marcellodesales/systemsexpert-publisher-subscriber bash
bash-5.0# (for i in `seq 1 10000`; do sleep 1; echo "$i"; done) | npm run publisher

> publisher-subscriber-algo-designexpert@1.0.0 publisher /app
> node publisher.js

SUBSCRIBER SERVER:PORT POINTS TO MSG SERVER pubsub_server:3001
^C
bash-5.0# (for i in `seq 1 10000`; do sleep 1; echo "$i"; done) | NAME=NEWS_NEWS TOPIC_ID=news_alerts npm run publisher

> publisher-subscriber-algo-designexpert@1.0.0 publisher /app
> node publisher.js

SUBSCRIBER SERVER:PORT POINTS TO MSG SERVER pubsub_server:3001
^C
bash-5.0# (for i in `seq 1 10000`; do sleep 1; echo "$i"; done) | NAME=NEWS_NEWS TOPIC_ID=news_alert npm run publisher

> publisher-subscriber-algo-designexpert@1.0.0 publisher /app
> node publisher.js

SUBSCRIBER SERVER:PORT POINTS TO MSG SERVER pubsub_server:3001
```
