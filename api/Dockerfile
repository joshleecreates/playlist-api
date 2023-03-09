FROM node:19

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production

COPY src/ src/
COPY server.js server.js

ENV NODE_OPTIONS="--require ./node_modules/@instana/collector/src/immediate"
EXPOSE 8080
CMD [ "node", "./src/seeds.js", "./server.js" ]