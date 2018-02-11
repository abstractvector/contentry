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
      },
      ancestry: '[Category]'
    };
  }

  initResolvers() {
    return {
      meta: (_) => {
        return _.getTermMeta();
      },
      posts: (_, args) => {
        return _.getTermTaxonomy().then(
          termTaxonomy => termTaxonomy.getPosts(this.decomposeArgs(args))
        );
      },
      ancestry: async (_) => {
        const termTaxonomy = await _.getTermTaxonomy();
        if (!termTaxonomy) {
          return [];
        }

        const ancestry = await termTaxonomy.findAncestry();
        if (!ancestry) {
          return [];
        }

        return ancestry.map(t => this.models.Term.findOne({ where: { id: t.termId }}));
      }
    };
  }
  
}