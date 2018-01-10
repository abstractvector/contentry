import Koa from 'koa';
import KoaRouter from 'koa-router';
import KoaBody from 'koa-bodyparser';
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa';

import Contentry from './app';

const app = new Koa();
const router = new KoaRouter();
const PORT = 3000;

const contentry = new Contentry();

router.post('/graphql', KoaBody(), graphqlKoa({ schema: contentry.getSchema() }));
router.get('/graphql', graphqlKoa({ schema: contentry.getSchema() }));

router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(PORT);