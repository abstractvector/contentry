import { Category, Option, Page, Post, User } from '../models';

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
    return User.find({ where: args });
  },
  post(_, args) {
    return Post.find({ where: args });
  },
  page(_, args) {
    return Page.find({ where: args });
  },
  option(_, args) {
    return Option.find({ where: args });
  },
  category(_, args) {
    return Category.find({ where: args });
  }
};

export default { resolver, typeDef };