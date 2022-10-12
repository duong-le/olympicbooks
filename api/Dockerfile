FROM node:18-alpine as development

WORKDIR /usr/src/app

COPY package.json ./

COPY yarn.lock ./

RUN yarn install

COPY . ./

RUN yarn build

FROM node:18-alpine as production

WORKDIR /usr/src/app

COPY package.json ./

COPY yarn.lock ./

RUN yarn install --production=true

COPY --from=development /usr/src/app/dist ./dist

CMD [ "node", "dist/main" ]