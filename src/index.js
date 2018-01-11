import Koa from 'koa';
import KoaRouter from 'koa-router';
import KoaBody from 'koa-bodyparser';
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa';
import config from 'config';

import Contentry from './app';

const contentry = new Contentry(config);

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