# Performance reviewer project

## Used frameworks & tools

 - AdonisJS v4.1
 - VueJS
 - Vuetify
 - Webpack
 - Postgres - for data storage
 - Redis - for session storage
 
## Run

Create `.env` file from `.env.sample`. Put your parameters there.

Project depends on Postgres and Redis. For quickstart you can start them from docker-compose.yml

```bash
docker-compose up -d
```

```bash

# install dependencies
npm ci
# build assets
npm run build
# apply db migrations
npm run migration:up
# load test data
npm run seed
# start server
npm start

```

Open http://127.0.0.1:3000

Username: admin@reviewer.io
Password: fake

## Development

```bash
# start server in development mode with webpack
npm run start:dev
```
