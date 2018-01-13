const typeDef = `
type Page {
  id: ID!
  name: String!
  title: String!
  content: String
  excerpt: String
  status: String
  author: User!
  parent: Page
  categories: [Category]
  tags: [Tag]
  createdAt: String!
  modifiedAt: String!
  comments: [Comment]
}
`;

const resolver = {
  parent(post) {
    return post.getParent();
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

export default { resolver, typeDef };