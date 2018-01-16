import AbstractResolver from './AbstractResolver';

export default class Category extends AbstractResolver {

  initFields() {
    return {
      id: 'ID!',
      name: 'String!',
      slug: 'String!',
      group: 'Int',
      posts: {
        arguments: { limit: 'Int', offset: 'Int', orderBy: 'String', order: 'String' },
        type: '[Post]'
      },
      meta: {
        type: '[MetaData]',
        enabled: false
      }
    };
  }

  initResolvers() {
    return {
      meta: (category) => {
        return category.getTermMeta();
      },
      posts: (category, args) => {
        return category.getTermTaxonomy().then(
          termTaxonomy => termTaxonomy.getPosts(this.decomposeArgs(args))
        );
      }
    };
  }
  
}