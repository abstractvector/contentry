const typeDef = `
type Link {
  id: Int!
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