FROM node:18-alpine as development

WORKDIR /usr/src/app

COPY package.json ./

COPY package-lock.json ./

RUN npm install

COPY . ./

RUN npm run build

FROM node:18-alpine as production

WORKDIR /usr/src/app

COPY --from=development /usr/src/app/dist ./dist

COPY --from=development /usr/src/app/package.json ./package.json

EXPOSE 8080

CMD [ "npm", "start" ]