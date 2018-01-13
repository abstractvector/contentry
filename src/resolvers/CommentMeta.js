const typeDef = `
type CommentMeta {
  id: ID!
  commentId: Int
  key: String
  value: String
}
`;

const resolver = {};

export default { resolver, typeDef };