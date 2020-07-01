FROM node:12-alpine3.9

WORKDIR /usr/ally-server
COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3333
CMD ["npm", "start"]