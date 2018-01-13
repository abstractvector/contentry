import AbstractResolver from './AbstractResolver';

export default class Attachment extends AbstractResolver {

  initFields() {
    return {
      id: 'ID!',
      createdAt: 'String',
      createdAtGmt: 'String',
      content: 'String',
      name: 'String',
      excerpt: 'String',
      status: 'String',
      commentStatus: 'String',
      pingStatus: 'String',
      password: {
        type: 'String',
        enabled: false
      },
      slug: 'String',
      toPing: {
        type: 'String',
        enabled: false
      },
      pinged: {
        type: 'String',
        enabled: false
      },
      modifiedAt: 'String',
      modifiedAtGmt: 'String',
      contentFiltered: 'String',
      parent: '[Attachment]',
      guid: {
        type: 'String',
        enabled: false
      },
      menuOrder: 'Int',
      type: {
        type: 'String',
        enabled: false
      },
      mimeType: 'String',
      commentCount: 'Int',
      meta: '[MetaData]'
    };
  }

  initResolvers() {
    return {
      parent(attachment) {
        return attachment.getParent();
      },
      meta(attachment) {
        return attachment.getPostMeta();
      }
    };
  }
  
}