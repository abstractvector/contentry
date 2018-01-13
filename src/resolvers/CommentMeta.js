const typeDef = `
type CommentMeta {
  id: Int!
  commentId: Int
  key: String
  value: String
}
`;

const resolver = {};

export default { resolver, typeDef };