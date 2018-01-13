import AbstractResolver from './AbstractResolver';

export default class Category extends AbstractResolver {

  initFields() {
    return {
      id: 'ID!',
      name: 'String!',
      slug: 'String!',
      group: 'Int',
      meta: {
        type: '[MetaData]',
        enabled: false
      }
    };
  }

  initResolvers() {
    return {
      meta(category) {
        return category.getTermMeta();
      }
    };
  }
  
}