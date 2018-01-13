export default function rootQuery({ models, options }) {
  const optionWhitelist = Array.isArray(options.optionWhitelist) ? options.optionWhitelist : [];

  const typeDef = `
  type Query {
    attachment(id: ID, slug: String): Attachment
    category(ID: Int, slug: String): Category
    comment(ID: Int): Comment
    link(id: ID, name: String): Link
    option(name: String): Option
    page(id: ID, slug: String): Page
    post(id: ID, slug: String): Post
    user(id: ID, slug: String): User
  }
  `;

  const resolver = {
    attachment(_, args) {
      return models.Attachment.find({ where: args });
    },
    category(_, args) {
      return models.Category.find({ where: args });
    },
    comment(_, args) {
      return models.Comment.find({ where: args });
    },
    link(_, args) {
      return models.Link.find({ where: args });
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
    page(_, args) {
      return models.Page.find({ where: args });
    },
    post(_, args) {
      return models.Post.find({ where: args });
    },
    user(_, args) {
      return models.User.find({ where: args });
    }
  };

  return { typeDef, resolver };
};