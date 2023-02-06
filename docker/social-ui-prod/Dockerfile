FROM node:16.13-alpine

RUN mkdir -p /usr/src/app

ENV NEXT_TELEMETRY_DISABLED 1

WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY yarn.lock /usr/src/app

RUN yarn install --production

COPY . /usr/src/app

RUN yarn build

EXPOSE ${PORT}
CMD [ "yarn", "start" ]