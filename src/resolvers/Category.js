const typeDef = `
type Category {
  id: ID!
  name: String!
  slug: String!
}
`;

const resolver = {};

export default { resolver, typeDef };