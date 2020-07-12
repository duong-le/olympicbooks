FROM node:lts-alpine as development

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

FROM node:lts-alpine as production

WORKDIR /usr/src/app

COPY --from=development /usr/src/app/dist ./dist

COPY --from=development /usr/src/app/package.json ./package.json

EXPOSE 8080

CMD [ "npm", "start" ]