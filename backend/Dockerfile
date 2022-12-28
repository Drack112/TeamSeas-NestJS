FROM node:18-slim As development

RUN apt update && apt install bash wget curl openssl -y

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

RUN yarn global add @nestjs/cli

WORKDIR /home/node/app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

FROM node:18-slim as production

RUN apt update && apt install bash wget curl openssl -y

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /home/node/app

COPY package.json yarn.lock ./

RUN yarn install --production=true

COPY tsconfig.json tsconfig.build.json ./

COPY --from=development /home/node/app/dist ./dist
