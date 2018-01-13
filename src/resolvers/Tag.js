const typeDef = `
"""
Custom tag used to describe the content
"""
type Tag {
  """
  Database ID for the tag
  """
  id: ID!
  """
  Human readable name of the tag
  """
  name: String!
  """
  URL-friendly slug for using this tag in links
  """
  slug: String!
}
`;

const resolver = {};

export default { resolver, typeDef };