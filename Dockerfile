FROM node:latest

ARG ENV_FILE

WORKDIR /usr/src/api

COPY . .

COPY $ENV_FILE .env.production

RUN yarn install --quiet --no-optional --no-fund --loglevel=error

RUN yarn build

EXPOSE 3000

CMD [ "yarn", "start:prod" ]
