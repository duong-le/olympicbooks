FROM node:12-alpine as development

WORKDIR /usr/src/app

COPY package.json ./

COPY yarn.lock ./

RUN yarn install

COPY . ./

RUN npm run build

FROM node:12-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./

COPY yarn.lock ./

RUN yarn install

COPY --from=development /usr/src/app/dist ./dist

CMD [ "node", "dist/main" ]