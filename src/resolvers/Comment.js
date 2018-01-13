import AbstractResolver from './AbstractResolver';

class Comment extends AbstractResolver {

  initFields() {
    return {
      id: 'ID!',
      attachment: 'Attachment',
      page: 'Page',
      post: 'Post',
      author: 'String',
      authorEmail: {
        type: 'String',
        enabled: false
      },
      authorUrl: {
        type: 'String',
        enabled: false
      },
      authorIP: {
        type: 'String',
        enabled: false
      },
      createdAt: 'String',
      createdAtGmt: 'String',
      content: 'String',
      karma: 'String',
      approved: 'String',
      agent: {
        type: 'String',
        enabled: false
      },
      type: 'String',
      user: 'User',
      meta: '[MetaData]',
      parent: 'Comment'
    }
  }

 initResolvers() {
    return {
      attachment(comment) {
        return comment.getAttachment();
      },
      page(comment) {
        return comment.getPage();
      },
      post(comment) {
        return comment.getPost();
      },
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