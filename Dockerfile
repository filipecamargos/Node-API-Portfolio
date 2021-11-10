FROM node:16

RUN mkdir /webAPI

WORKDIR /webAPO

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080
CMD [ "node", "app.js" ]