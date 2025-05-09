FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm i -g serve

COPY . .

RUN npm run build

EXPOSE ${FRONTEND_PORT}

CMD serve -s dist -p ${FRONTEND_PORT}


