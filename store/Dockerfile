FROM node:16-alpine as development

WORKDIR /usr/src/app

COPY package.json ./

COPY yarn.lock ./

RUN yarn install

COPY . ./

RUN yarn build

FROM node:16-alpine as production

WORKDIR /usr/src/app

COPY --from=development /usr/src/app/dist ./dist

COPY --from=development /usr/src/app/package.json ./package.json

EXPOSE 8080

CMD [ "npm", "start" ]