FROM node:latest

WORKDIR /usr/src/api

COPY . .
COPY ./.env .env.production

RUN yarn install --quiet --no-optional --no-fund --loglevel=error

RUN yarn build

EXPOSE 3000

CMD [ "yarn", "start:prod" ]