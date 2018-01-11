export default function rootQuery(models) {
  const typeDef = `
  type Query {
    user(id: Int, slug: String): User
    post(id: Int, slug: String): Post
    page(id: Int, slug: String): Page
    option(name: String): Option
    category(id: Int, slug: String): Category
  }
  `;

  const resolver = {
    user(_, args) {
      return models.User.find({ where: args });
    },
    post(_, args) {
      return models.Post.find({ where: args });
    },
    page(_, args) {
      return models.Page.find({ where: args });
    },
    option(_, args) {
      return models.Option.find({ where: args });
    },
    category(_, args) {
      return models.Category.find({ where: args });
    }
  };

  return { typeDef, resolver };
};