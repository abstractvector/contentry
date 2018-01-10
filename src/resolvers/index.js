import fs from 'fs';

let resolvers = {};
let typeDefs = [];

const resolverNames = fs.readdirSync(__dirname)
  .map(f => f.substr(0, f.indexOf('.js')))
  .filter(f => 'index' !== f);

resolverNames.forEach(function(name) {
  const r = require(`${__dirname}/${name}`);
  resolvers[name] = r.default.resolver;
  typeDefs.push(r.default.typeDef);
});

typeDefs = typeDefs.join("\r\n");

export { resolvers, typeDefs };