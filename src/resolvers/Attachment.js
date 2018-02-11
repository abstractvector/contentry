import Serialize from 'php-serialize';

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
        enabled: true
      },
      menuOrder: 'Int',
      type: {
        type: 'String',
        enabled: false
      },
      mimeType: 'String',
      commentCount: 'Int',
      meta: '[MetaData]',
      width: 'Int',
      height: 'Int'
    };
  }

  initResolvers() {
    return {
      parent(attachment) {
        return attachment.getParent();
      },
      meta(attachment) {
        return attachment.getPostMeta();
      },
      width: async (_) => {
        const meta = await this.getMeta(_);
        return meta.width || null;
      },
      height: async (_) => {
        const meta = await this.getMeta(_);
        return meta.height || null;
      }
    };
  }

  async getMeta(_) {
    const meta = await _.getPostMeta({ where: { key: '_wp_attachment_metadata' }});
    if (null === meta || meta.length !== 1) {
      return null;
    }

    try {
      return Serialize.unserialize(meta[0].value) || null;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
  
}