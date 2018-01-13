import AbstractResolver from './AbstractResolver';

class Comment extends AbstractResolver {

  initFields() {
    return {
      id: 'ID!',
      postId: 'Int',
      author: 'String',
      createdAt: 'String',
      content: 'String',
      type: 'String',
      user: 'User',
      meta: '[CommentMeta]',
      parent: 'Comment'
    }
  }

 initResolvers() {
    return {
      parent(comment) {
        return comment.getParent();
      },
      user(comment) {
        return comment.getUser();
      },
      meta(comment) {
        return comment.getCommentMeta();
      }
    };
  }

}

export default Comment;