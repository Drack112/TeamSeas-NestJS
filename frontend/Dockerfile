FROM node:16-alpine AS development

ENV NODE_ENV development

RUN apk add --no-cache bash

WORKDIR /home/app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

EXPOSE 3000
