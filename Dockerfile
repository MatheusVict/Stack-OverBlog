FROM node:latest

WORKDIR /usr/src/api
ARG ENV_FILE

COPY . .

COPY . $ENV_FILE

RUN yarn install --quiet --no-optional --no-fund --loglevel=error

RUN yarn build

EXPOSE 3000

CMD [ "yarn", "start:prod" ]
