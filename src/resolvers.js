import fs from 'fs';

import rootQuery from './rootQuery';

class Resolvers {

  constructor(app) {
    this.resolvers = {};

    this.typeDefs = fs.readdirSync(`${__dirname}/resolvers/`)
      .filter(f => f !== 'AbstractResolver.js')
      .map(f => {
        let name = f.substr(0, f.indexOf('.js'));

        const t = require(`${__dirname}/resolvers/${f}`).default;
        if (t.resolver && t.typeDef) {
          this.resolvers[name] = t.resolver;
          return t.typeDef;
        } else {
          let options = {};
          if (app.options.resolvers && app.options.resolvers[name]) {
            options = app.options.resolvers[name];
          }
          const r = new t(options);
          app.emit(`afterInitResolver:${name}`, r, app);
          this.resolvers[name] = r.getResolvers();
          return r.getTypeDef();
        }
      });

    this.rootQuery = rootQuery({ models: app.models, options: app.options.resolvers.rootQuery});

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