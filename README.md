# GraphQL Nexus & Sofa

## Directory description

- _api_ -> containing the graphQL and REST APIs
- _prisma_ -> containing the migrations, the environment and the database schema with prisma
- _tests_ -> containing the JEST tests on the API

### api

Separate file in 3 parts :
- _generated_ -> containing the graphQL schema and typing.
- _graphql_ -> containing the graphQL API core
- _rest_ -> containing the configuration and deployment of the API in REST

The app.ts file is used to call the GraphQL and REST servers.

In order to implement new functionalities, you only need to modify
the code in the folder **graphql**.

## On boarding

Installation of the current database:
```shell script
docker run --detach --publish 5432:5432 -e POSTGRES_PASSWORD=postgres --name postgres postgres:10.12
npx prisma migrate save --experimental
npx prisma migrate up --experimental
npx prisma generate
```

To launch the application :

```shell script
npm ci
```

## Contribution
Léo Riberon-Piatyszek
