import AbstractResolver from './AbstractResolver';

export default class Option extends AbstractResolver {

  initFields() {
    return {
      id: 'ID!',
      name: 'String!',
      value: 'String',
      autoload: 'String'
    };
  }
  
}