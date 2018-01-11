import { makeExecutableSchema } from 'graphql-tools';
import Sequelize from 'sequelize';

import Resolvers from './resolvers';
import { loadModels } from './models';

class Contentry {

  constructor(options) {
    this._parseOptions(options);

    const databaseOptions = this.options.wordpress.db;

    // connect to the database
    this.db = new Sequelize(
      databaseOptions.database,
      databaseOptions.username,
      databaseOptions.password,
      {
        host: databaseOptions.hostname,
        dialect: 'mysql',
        operatorsAliases: false,
        define: {
          underscored: true,
          timestamps: false
        }
      }
    );

    // add a tableName prefix to all tables here
    this.db.addHook('beforeDefine', (attributes, options) => {
      options.tableName = databaseOptions.tablePrefix + options.tableName;
    });

    const models = loadModels(this.db);

    this.resolvers = new Resolvers(models);

    this.schema = makeExecutableSchema({
      typeDefs: this.resolvers.getTypeDefs(),
      resolvers: this.resolvers.getResolvers()
    });
  }

  _parseOptions(options) {
    this.options = Object.assign({
      wordpress: {
        db: {
          hostname: 'localhost',
          username: 'user',
          password: 'pass',
          database: 'database',
          tablePrefix: ''
        }
      }
    }, options);
  }

  getSchema() {
    return this.schema;
  }

}

export default Contentry;