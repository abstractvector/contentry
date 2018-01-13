import AbstractResolver from './AbstractResolver';

export default class Tag extends AbstractResolver {

  getDescription() {
    return 'Custom tag used to describe the content';
  }

  initFields() {
    return {
      id: {
        type: 'ID!',
        description: 'Database ID for the tag'
      },
      name: {
        type: 'String!',
        description: 'Human readable name of the tag'
      },
      slug: {
        type: 'String',
        description: 'URL-friendly slug for using this tag in links'
      },
      group: {
        type: 'String',
        description: 'For plugins and themes to group terms together for aliases'
      },
      meta: {
        type: '[MetaData]',
        description: 'Arbitrary metadata associated with this tag',
        enabled: false
      }
    };
  }

  initResolvers() {
    return {
      meta(tag) {
        return tag.getTermMeta();
      }
    };
  }
  
}