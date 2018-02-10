import { isBoolean } from 'util';

export default class AbstractResolver {

  constructor(args = {}) {
    if (new.target === AbstractResolver) {
      throw new TypeError(`Cannot construct ${new.target} instances directly`);
    }

    if (!args || typeof args !== 'object') {
      throw new TypeError(`Resolver class must be constructed with object, received: ${typeof args}`);
    }

    const { models = {}, options = {} } = args;

    this.models = models;
    this.options = options;

    this.name = this.initName() || this.constructor.name;

    this.fields = {};

    Object.entries(this.initFields()).forEach(([key, value]) => {
      this.setField(key, value);
    });

    this.resolvers = this.initResolvers();
  }

  initName() {
    return null;
  }

  initFields() {
    throw new TypeError(`initFields() must be overriden in the child class`);
  }

  initResolvers() {
    return {};
  }

  getName() {
    return this.name;
  }

  getDescription() {
    return '';
  }

  getTypeDef() {
    const fieldMap = Object.keys(this.fields)
      .filter(field => this.fields[field].enabled)
      .map(field => {
        const description = this.fields[field].description ? `"""
  ${this.fields[field].description}
  """
  ` : '';
        let fieldString = `${description}${field}`;
        if (this.fields[field].arguments && Object.keys(this.fields[field].arguments).length > 0) {
          fieldString += `(${Object.entries(this.fields[field].arguments).map(([key, value]) => `${key}: ${value}`).join(', ')})`;
        }
        fieldString += `: ${this.fields[field].type}`;
        return fieldString;
      });

    const description = this.getDescription() ? `
"""
${this.getDescription()}
"""` : '';

    const typeDefString = `
${description}
type ${this.getName()} {
  ${fieldMap.join("\r\n  ")}
}`;

    return typeDefString;
  }

  setField(name, options) {
    let field = {};
    switch (typeof options) {
      case 'string':
        field = {
          type: options,
          enabled: true,
          desription: null,
          arguments: {}
        };
        break;

      case 'object':
        field = Object.assign({
          type: null,
          enabled: true,
          description: null,
          arguments: {}
        }, options);
        break;

      default:
        throw new TypeError(`Field definition for ${this.getName()}.${name} in resolver is invalid type: ${typeof options}`);
    }

    if ('object' === typeof this.options.fields && isBoolean(this.options.fields[name])) {
      field.enabled = this.options.fields[name];
    }

    this.fields[name] = field;
    return this;
  }

  getResolvers() {
    const resolvers = {};
    Object.keys(this.fields)
      .filter(field => this.fields[field].enabled)
      .forEach(field => {
        if (this.resolvers[field]) {
          resolvers[field] = this.resolvers[field];
        }
      });

    return resolvers;
  }

  getResolver(key) {
    return this.resolvers[key];
  }

  setResolver(key, value) {
    if ('function' !== typeof value) {
      throw new TypeError(`Resolvers should be a function, but received type: ${typeof value}`);
    }
    this.resolvers[key] = value;
    return this;
  }

  decomposeArgs(args) {
    let options = {
      where: {},
      limit: null,
      offset: null,
      order: null
    };

    let order = { order: null, orderBy: null} ;

    Object.entries(args).forEach(([key, value]) => {
      switch (key) {
        case 'limit':
        case 'offset':
          options[key] = value;
          break;

        case 'order':
        case 'orderBy':
          order[key] = value;
          break;

        default:
          options.where[key] = value;
      }
    });

    if (order.orderBy !== null) {
      options.order = [ [order.orderBy, order.order] ];
    }

    return options;
  }

}