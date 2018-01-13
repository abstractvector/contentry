import AbstractResolver from './AbstractResolver';

export default class Post extends AbstractResolver {

  initFields() {
    return {
      id: 'ID!',
      name: 'String!',
      slug: 'String!',
      content: 'String',
      excerpt: 'String',
      status: 'String',
      author: 'User!',
      categories: '[Category]',
      tags: '[Tag]',
      comments: '[Comment]',
      createdAt: 'String!',
      modifiedAt: 'String!'
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
      }
    };
  }
  
}
