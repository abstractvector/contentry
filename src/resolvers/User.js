const typeDef = `
type User {
  id: ID!
  displayName: String!
  posts: [Post]
}
`;

const resolver = {
  posts(user) {
    return user.getPosts();
  }
};

export default { resolver, typeDef };