const typeDef = `
type User {
  id: Int!
  displayName: String!
  slug: String!
  posts: [Post]
}
`;

const resolver = {
  posts(user) {
    return user.getPosts();
  }
};

export default { resolver, typeDef };