export default function rootQuery({ models, options }) {
  const optionWhitelist = Array.isArray(options.optionWhitelist) ? options.optionWhitelist : [];

  const typeDef = `
  type Query {
    user(id: Int, slug: String): User
    post(id: Int, slug: String): Post
    page(id: Int, slug: String): Page
    option(name: String): Option
    category(id: Int, slug: String): Category
    link(id: Int, name: String): Link
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
      return models.Option.find({ where: args }).then((option) => {
        // want to check that the option is whitelisted so we don't leak private information
        // we do it here to allow future elevated user permissions and other query formats
        return (
          optionWhitelist.indexOf(option.name) > -1 ||
          optionWhitelist.filter(o => RegExp(`^${o}$`).test(option.name)).length > 0
        ) ? option : null;
      });
    },
    category(_, args) {
      return models.Category.find({ where: args });
    },
    link(_, args) {
      return models.Link.find({ where: args });
    }
  };

  return { typeDef, resolver };
};