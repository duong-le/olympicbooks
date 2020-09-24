FROM node:lts-alpine as development

WORKDIR /usr/src/app

COPY package.json ./

COPY yarn.lock ./

RUN apk add --no-cache --virtual .gyp \
  python \
  make \
  g++ \
  && yarn install \
  && apk del .gyp

COPY . ./

RUN npm run build

FROM node:lts-alpine as production

WORKDIR /usr/src/app

COPY --from=development /usr/src/app/dist ./dist

COPY --from=development /usr/src/app/package.json ./package.json

EXPOSE 8080

CMD [ "npm", "start" ]