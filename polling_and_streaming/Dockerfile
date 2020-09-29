FROM node:14.11.0-alpine3.12

WORKDIR /app
COPY package.json .

RUN npm install --production
COPY client.js .
COPY server.js .
COPY messaging_api.js .
COPY helper.js .

ENTRYPOINT ["npm"]
CMD ["run", "db"]
