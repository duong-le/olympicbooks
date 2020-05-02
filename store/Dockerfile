FROM node:lts-alpine as node

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk add --no-cache --virtual .gyp \
  python \
  make \
  g++ \
  && npm install \
  && apk del .gyp

COPY . ./

RUN npm run build

FROM node:lts-alpine

WORKDIR /usr/src/app

COPY --from=node /usr/src/app/dist /usr/src/app/dist

COPY --from=node /usr/src/app/package.json ./package.json

EXPOSE 8080

CMD [ "npm", "start" ]