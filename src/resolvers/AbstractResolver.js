class AbstractResolver {
  constructor(options) {
    if (new.target === AbstractResolver) {
      throw new TypeError(`Cannot construct ${new.target} instances directly`);
    }

    this.name = this.constructor.name;
    this.options = options || {};

    this.fields = this.initFields();
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
      .filter(field => this.shouldIncludeField(field))
      .map(field => {
        switch (typeof this.fields[field]) {
          case 'string':
            return `${field}: ${this.fields[field]}`;
          case 'object':
            if (!this.fields[field].type) {
              throw new TypeError(`Field definition for ${this.getName()}.${field} must specify the type but none found`);
            }
            const description = this.fields[field].description ? `"""
  ${this.fields[field].description}
  """
  ` : '';
            return `${description}${field}: ${this.fields[field].type}`;
          default:
            throw new TypeError(`Field definition for ${this.getName()}.${field} in resolver is invalid type: ${typeof this.fields[field]}`);
        }
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

  shouldIncludeField(field) {
    if (Array.isArray(this.options.fields)) {
      return this.options.fields.indexOf(field) > -1;
    }
    return true;
  }

  getResolvers() {
    const resolvers = {};
    Object.keys(this.fields)
      .filter(field => this.shouldIncludeField(field))
      .forEach(field => {
        if (this.resolvers[field]) {
          resolvers[field] = this.resolvers[field];
        }
      });

    return resolvers;
  }
}

export default AbstractResolver;