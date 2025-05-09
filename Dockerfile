FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY backend backend/

EXPOSE ${BACKEND_PORT}

CMD ["node", "backend/index.js"]