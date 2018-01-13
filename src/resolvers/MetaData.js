import AbstractResolver from './AbstractResolver';

export default class MetaData extends AbstractResolver {

  initFields() {
    return {
      key: 'String!',
      value: 'String'
    };
  }
  
}