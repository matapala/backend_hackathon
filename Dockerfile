FROM node:6
RUN npm install -g pm2
WORKDIR /usr/src/app
