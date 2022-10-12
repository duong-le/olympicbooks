# Olympicbooks

An e-commerce platform using the client-server architecture.

## Prerequisites

These components are required for this application to work:

- docker

## Setup environment

You might need to manually create an environment file for related environment: local and production.

Create `api/.env` and fill in as `api/.env.example`

```
NODE_ENV=DEV

<!-- Database config -->
SQL_HOST=
SQL_NAME=
SQL_USER=
SQL_PASSWORD=

<!-- Security config -->
JWT_SECRET=

<!-- File storage config -->
GCS_BUCKET=
GOOGLE_APPLICATION_CREDENTIALS=
```

## Start the server

In the terminal, run this command:

```
$ docker compose up
```

This will create 4 services: API, store, admin and database. In order for these services to run properly, you must run database migration first:

```
$ cd api
$ npm run migration:run
```

## License

Feel free to use my code on your project. It would be great if you put a reference to this repository.

[MIT](https://opensource.org/licenses/MIT)
