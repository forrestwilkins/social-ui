FROM node:16.13-alpine

RUN mkdir -p /app

WORKDIR /app

COPY package*.json /app

RUN yarn install

COPY . /app

EXPOSE ${PORT}

ENV NEXT_TELEMETRY_DISABLED 1