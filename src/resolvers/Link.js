import AbstractResolver from './AbstractResolver';

export default class Link extends AbstractResolver {

  initFields() {
    return {
      id: 'ID!',
      url: 'String!',
      name: 'String!',
      image: 'String',
      target: 'String',
      description: 'String',
      rating: 'Int',
      modifiedAt: 'String',
      rel: 'String',
      notes: 'String'
    };
  }
  
}