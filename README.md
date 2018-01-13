# Contentry
Highly extensible GraphQL read APIs for the WordPress blog platform.

[![Build Status][travis-image]][travis-url]
[![Node Version][node-image]][node-url]
[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]

By reading directly from the MySQL database, this library allows you to make the WordPress webserver externally inaccessible and expose the content to your UI via GraphQL. This integration model makes it the perfect partner for a Progressive Web App built using a technology such as ReactJS.

```js
// import into your own application
import Contentry from 'contentry';

const options = { /* ... */ }; // e.g. load in from config file

// create the app
const contentry = new Contentry(options);
```

or

```bash
# run as a standalone server
$ npm start
```

# Getting Started

Contentry can operate in one of two modes - either as a wrapper around a set of GraphQL types, schemas and resolvers which you can load into your own GraphQL server, or a standalone server that makes it really easy to get up and running straight away.

## Import into your own application

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).
Node.js 7.x or higher is required.

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm install contentry
```

## Run as a standalone server

The `./lib/server.js` file will spin up a web server using [koa](http://koajs.com/) to expose a GraphQL at `/graphql` and optionally a GraphiQL UI at `/graphiql`. This command is tied to the npm scripts so you can start the server by running:

```bash
$ npm start
```

The configuration is intended to provide sensible defaults, but you can override these easily by changing the configuration in the `./config/` folder. You can also pass in environmental variables to provide access to the MySQL database powering WordPress.

### Environmental Variables

The following environmental variables are available to configure access to the database:

| Environment Variable | Default Value | Notes |
| -------------------- | ------------- | ----- |
| MYSQL_HOSTNAME | localhost | MySQL database hostname |
| MYSQL_USERNAME | root | MySQL user with read permissions to the WordPress database |
| MYSQL_PASSWORD | *[empty]* | Password for the MySQL user |
| MYSQL_DATABASE | wordpress | WordPress database name |
| MYSQL_TABLE_PREFIX | wp_ | Prefix for the table names within the WordPress database |

# GraphQL Server

The application is a wrapper around a set of GraphQL schemas and types, along with resolvers which retrieve data directly from the WordPress database.

If you are using the server directly then by default it exposes an HTTP server on port 3000. This can be changed with the options key `server.port` passed into the application constructor and defined in the config file.

The data are then made available as a GraphQL API at:

```http
http://localhost:3000/graphql
```

There is also a GraphiQL UI for navigating the GraphQL API available at:

```http
http://localhost:3000/graphiql
```

# API

The API is intended to be discoverable, and can be easily browsed using the GraphiQL endpoint.

# Events

The application does emit some events. Until these are thoroughly documented, you can see the full list of these by binding to the `*` event as follows:

```js
contentry.on('*', console.log);
```

# To Do
- Add documentation for:
  - GraphQL Schema and Types
  - Field and metadata enabling / disabling
  - Configuration file
- Add significantly more unit tests

# Future Roadmap
- Explore use of DataLoaders and caching to improve performance
- Authentication / authorization for accessing privileged content (unpublished posts, private settings, etc)
- Build interface to allow easy integration of plugins
- Support for WordPress plugins
- Webhooks for invalidating cache / updating websocket connections
- Mutations