FROM node:9.4-alpine

WORKDIR /usr/src/app
COPY package.json package-lock.json /usr/src/app/
COPY config /usr/src/app/config
COPY src /usr/src/app/src

RUN npm install
RUN npm run build

EXPOSE 3000

CMD npm start