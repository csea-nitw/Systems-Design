FROM node:14.11.0-alpine3.12

RUN apk add bash

WORKDIR /app
COPY package.json .

RUN npm install --production
COPY server.js .
COPY publisher.js .
COPY subscriber.js .
COPY messaging_api.js .

CMD ["npm start"]
