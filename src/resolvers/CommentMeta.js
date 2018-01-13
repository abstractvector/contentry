import AbstractResolver from './AbstractResolver';

export default class CommentMeta extends AbstractResolver {

  initFields() {
    return {
      id: 'ID!',
      commentId: 'Int',
      key: 'String!',
      value: 'String'
    };
  }
  
}