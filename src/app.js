import { makeExecutableSchema } from 'graphql-tools';

import { typeDefs, resolvers } from './resolvers';

class Contentry {

  constructor() {
    this.wordpressSchema = makeExecutableSchema({ typeDefs, resolvers });
  }

  getSchema() {
    return this.wordpressSchema;
  }

}

export default Contentry;