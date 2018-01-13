const typeDef = `
type Link {
  id: ID!
  url: String!
  name: String!
  image: String
  target: String
  description: String
  rating: Int
  modifiedAt: String
  rel: String
  notes: String
}
`;

const resolver = {};

export default { resolver, typeDef };