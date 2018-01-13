import AbstractResolver from './AbstractResolver';

export default class Category extends AbstractResolver {

  initFields() {
    return {
      id: 'ID!',
      name: 'String!',
      slug: 'String!',
      group: 'Int'
    };
  }
  
}