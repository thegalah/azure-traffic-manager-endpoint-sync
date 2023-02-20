FROM node:16.13.2-alpine
COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock
WORKDIR /app
ENTRYPOINT yarn install && yarn run start