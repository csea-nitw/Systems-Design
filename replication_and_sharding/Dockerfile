FROM node:14.11.0-alpine3.12

WORKDIR /app
COPY package.json .

RUN npm install --production
COPY aedb_proxy.js .
COPY aedb.js .

VOLUME /aedb/shards

ENTRYPOINT ["npm"]
CMD ["run", "db"]
