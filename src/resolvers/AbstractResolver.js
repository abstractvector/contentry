import { isBoolean } from 'util';

export default class AbstractResolver {

  constructor(options) {
    if (new.target === AbstractResolver) {
      throw new TypeError(`Cannot construct ${new.target} instances directly`);
    }

    this.name = this.constructor.name;
    this.options = options || {};

    const fields = this.initFields();
    this.fields = {};

    Object.keys(fields).forEach(name => {
      let field = {};
      switch (typeof fields[name]) {
        case 'string':
          field = {
            type: fields[name],            
            enabled: true,
            desription: null
          };
          break;

        case 'object':
          field = Object.assign({
            type: null,
            enabled: true,
            description: null
          }, fields[name]);
          break;

        default:
          throw new TypeError(`Field definition for ${this.getName()}.${name} in resolver is invalid type: ${typeof fields[name]}`);
      }

      if ('object' === typeof this.options.fields && isBoolean(this.options.fields[name])) {
        field.enabled = this.options.fields[name];
      }

      this.fields[name] = field;
    });

    this.resolvers = this.initResolvers();
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
        return `${description}${field}: ${this.fields[field].type}`;
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
}