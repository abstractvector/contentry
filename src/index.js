import { EventEmitter } from 'events';

import { makeExecutableSchema } from 'graphql-tools';
import Sequelize from 'sequelize';

import Resolvers from './resolvers';
import { loadModels } from './models';

class Contentry extends EventEmitter {

  constructor(options, localMakeExecutableSchema) {
    super();

    this._parseOptions(options);

    const databaseOptions = this.options.wordpress.db;

    // connect to the database
    this.emit('beforeCreateDb', this);
    this.db = new Sequelize(
      databaseOptions.database,
      databaseOptions.username,
      databaseOptions.password,
      {
        logging: this.options.debug ? console.log : false,
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

    this.emit('beforeLoadModels', this);
    this.models = loadModels(this);

    this.emit('beforeLoadResolvers', this);
    this.resolvers = new Resolvers(this);

    this.emit('beforeCreateSchema', this);
    this.schema = (localMakeExecutableSchema || makeExecutableSchema)({
      typeDefs: this.resolvers.getTypeDefs(),
      resolvers: this.resolvers.getResolvers()
    });
    
    this.emit('afterConstruct', this);
  }

  _parseOptions(options) {
    this.options = Object.assign({
      debug: false,
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

    if ('object' === typeof this.options.hooks) {
      Object.entries(this.options.hooks).forEach(([event, fn]) => {
        if ('function' === typeof fn) {
          this.on(event, fn);
        }
      });
    }
  }

  emit(event) {
    /*
    // using this wildcard event for easy debugging to see which events fire
    if ('*' !== event) {
      this.emit('*', event, this);
    }
    */
    return super.emit.apply(this, arguments);
  }

  getSchema() {
    return this.schema;
  }

}

export default Contentry;