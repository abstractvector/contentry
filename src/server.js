import Koa from 'koa';
import KoaRouter from 'koa-router';
import KoaBody from 'koa-bodyparser';
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa';
import config from 'config';

import Contentry from './index';

// override some of the config with environment variables if they're set
config.wordpress.db.hostname = process.env.MYSQL_HOSTNAME || config.wordpress.db.hostname;
config.wordpress.db.username = process.env.MYSQL_USERNAME || config.wordpress.db.username;
config.wordpress.db.password = process.env.MYSQL_PASSWORD || config.wordpress.db.password;
config.wordpress.db.database = process.env.MYSQL_DATABASE || config.wordpress.db.database;
config.wordpress.db.tablePrefix = process.env.MYSQL_TABLE_PREFIX || config.wordpress.db.tablePrefix;

// create the app
const contentry = new Contentry(config);

// enable the server itself
if (true === config.get('server.enabled')) {
  const app = new Koa();
  const router = new KoaRouter();

  // enable the GraphQL endpoint
  router.post('/graphql', KoaBody(), graphqlKoa({ schema: contentry.getSchema() }));
  router.get('/graphql', graphqlKoa({ schema: contentry.getSchema() }));

  // enable GraphiQL UI
  if (true === config.get('server.graphiql')) {
    router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));
  }

  app.use(router.routes());
  app.use(router.allowedMethods());

  // listen on the specified port
  app.listen(config.get('server.port') || 3000);
}