import fs from 'fs';

import rootQuery from './rootQuery';

class Resolvers {

  constructor(models) {
    this.resolvers = {};

    this.typeDefs = fs.readdirSync(`${__dirname}/resolvers/`)
      .map(f => {
        let name = f.substr(0, f.indexOf('.js'));
        const {resolver, typeDef} = require(`${__dirname}/resolvers/${f}`).default;
        this.resolvers[name] = resolver;
        return typeDef;
      });

    this.rootQuery = rootQuery(models);

    this.resolvers.Query = this.rootQuery.resolver;
    this.typeDefs.push(this.rootQuery.typeDef);
  }

  getResolvers() {
    return this.resolvers;
  }

  getTypeDefs() {
    return this.typeDefs.join("\r\n");
  }
}

export default Resolvers;