import AbstractResolver from './AbstractResolver';

export default class Option extends AbstractResolver {

  initFields() {
    return {
      name: 'String!',
      value: 'String'
    };
  }
  
}