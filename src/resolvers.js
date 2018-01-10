import fs from 'fs';

let resolvers = {};

let typeDefs = fs.readdirSync(`${__dirname}/resolvers/`)
  .map(f => {
    let name = f.substr(0, f.indexOf('.js'));
    const {resolver, typeDef} = require(`${__dirname}/resolvers/${f}`).default;
    resolvers[name] = resolver;
    return typeDef;
  });

typeDefs = typeDefs.join("\r\n");

export { resolvers, typeDefs };