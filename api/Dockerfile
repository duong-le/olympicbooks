FROM node:18-alpine as development

WORKDIR /usr/src/app

COPY package.json ./

COPY package-lock.json ./

RUN npm install --force

COPY . ./

RUN npm run build

FROM node:18-alpine as production

WORKDIR /usr/src/app

COPY package.json ./

COPY package-lock.json ./

RUN npm install --force --production=true

COPY --from=development /usr/src/app/dist ./dist

CMD [ "node", "dist/main" ]