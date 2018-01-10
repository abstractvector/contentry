import Koa from 'koa';
import KoaRouter from 'koa-router';
import KoaBody from 'koa-bodyparser';
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa';

import schema from './schema';

const app = new Koa();
const router = new KoaRouter();
const PORT = 3000;

router.post('/graphql', KoaBody(), graphqlKoa({ schema: schema }));
router.get('/graphql', graphqlKoa({ schema: schema }));

router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(PORT);