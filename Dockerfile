FROM node:latest

WORKDIR /usr/src

COPY . .

COPY .env .

RUN yarn install --quiet --no-optional --no-fund --loglevel=error

RUN yarn build

EXPOSE 3000

CMD [ "yarn", "start:prod" ]
