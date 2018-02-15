import Formatter from '../helpers/Formatter';
import AbstractResolver from './AbstractResolver';

export default class Page extends AbstractResolver {

  initFields() {
    return {
      id: 'ID!',
      createdAt: 'String!',
      createdAtGmt: 'String!',
      content: 'String',
      name: 'String!',
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
      guid: {
        type: 'String',
        enabled: false
      },
      menuOrder: 'Int',
      type: {
        type: 'String',
        enabled: false
      },
      mimeType: {
        type: 'String',
        enabled: false
      },
      commentCount: 'Int',
      author: 'User!',
      parent: 'Page',
      categories: '[Category]',
      tags: '[Tag]',
      comments: '[Comment]',
      meta: {
        type: '[MetaData]',
        enabled: false
      }
    };
  }

  initResolvers() {
    return {
      parent(page) {
        return page.getParent();
      },
      categories(page) {
        return page.getTermTaxonomies({ where: { taxonomy: 'category' }}).then(termTaxonomies => {
          return termTaxonomies.map(t => {
            return t.getTerm();
          })
        });
      },
      tags(page) {
        return page.getTermTaxonomies({ where: { taxonomy: 'post_tag' }}).then(termTaxonomies => {
          return termTaxonomies.map(t => {
            return t.getTerm();
          })
        });
      },
      comments(page) {
        return page.getComments();
      },
      meta(page) {
        return page.getPostMeta();
      },
      content(page) {
        return Formatter.wpParse(page.get('content'));
      }
    };
  }
  
}