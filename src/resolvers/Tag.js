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
      }
    };
  }
  
}