FROM node:16
WORKDIR 'usr/src/app'

COPY server/package*.json ./
RUN npm install

COPY server ./server
COPY client ./client

RUN npm run build

EXPOSE 3000

CMD ["node", "server/server.js"]