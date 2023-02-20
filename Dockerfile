FROM node:16.13.2-alpine
COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock
WORKDIR /app


WORKDIR /app
RUN yarn install
COPY . /app/
RUN yarn run build

ENTRYPOINT node dist/Program.js