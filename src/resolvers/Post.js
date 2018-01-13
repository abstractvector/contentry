import AbstractResolver from './AbstractResolver';

export default class Post extends AbstractResolver {

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
      parent: 'Post',
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
      author(post) {
        return post.getAuthor();
      },
      categories(post) {
        return post.getTermTaxonomies({ where: { taxonomy: 'category' }}).then(termTaxonomies => {
          return termTaxonomies.map(t => {
            return t.getTerm();
          })
        });
      },
      tags(post) {
        return post.getTermTaxonomies({ where: { taxonomy: 'post_tag' }}).then(termTaxonomies => {
          return termTaxonomies.map(t => {
            return t.getTerm();
          })
        });
      },
      comments(post) {
        return post.getComments();
      },
      meta(post) {
        return post.getPostMeta();
      }
    };
  }
  
}
