import fs from 'fs';

import Sequelize from 'sequelize';

import { createRelationships } from './relationships';

const sequelize = new Sequelize('mysql://root@127.0.0.1/wordpress', {
  operatorsAliases: false,
  define: {
    underscored: true,
    timestamps: false
  }
});

// add a tableName prefix to all tables here
sequelize.addHook('beforeDefine', (attributes, options) => {
  options.tableName = 'wp_' + options.tableName;
});

// load in all the models
fs.readdirSync(`${__dirname}/models/`)
  .forEach(function(f) {
    let model = f.substr(0, f.indexOf('.js'));
    module.exports[model] = sequelize.import(`${__dirname}/models/${model}`);
  });

createRelationships(module.exports);

// export connection
export { sequelize };