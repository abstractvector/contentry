import AbstractResolver from './AbstractResolver';

export default class User extends AbstractResolver {

  initFields() {
    return {
      id: 'ID!',
      login: {
        type: 'String',
        enabled: false
      },
      passwordHash: {
        type: 'String',
        enabled: false
      },
      niceName: {
        type: 'String',
        enabled: false
      },
      url: {
        type: 'String',
        enabled: false
      },
      registeredAt: 'String',
      activationKey: {
        type: 'String',
        enabled: false
      },
      status: {
        type: 'String',
        enabled: false
      },
      displayName: 'String',
      attachments: '[Attachment]',
      comments: '[Comment]',
      links: '[Link]',
      pages: '[Page]',
      posts: '[Post]',
      meta: {
        type: '[MetaData]',
        enabled: false
      }
    };
  }

  initResolvers() {
    return {
      attachments(user) {
        return user.getAttachments();
      },
      comments(user) {
        return user.getComments();
      },
      links(user) {
        return user.getLinks();
      },
      pages(user) {
        return user.getPages();
      },
      posts(user) {
        return user.getPosts();
      },
      meta(user) {
        return user.getUserMeta();
      }
    };
  }
  
}