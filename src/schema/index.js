import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';

import { typeDefs, resolvers } from '../resolvers';

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;