import AbstractResolver from './resolvers/AbstractResolver';

export default class RootQuery extends AbstractResolver {

  initName() {
    return 'Query';
  }

  initFields() {
    return {
      attachment: {
        arguments: { id: 'ID', slug: 'String' },
        type: 'Attachment'
      },
      category: {
        arguments: { id: 'ID', slug: 'String' },
        type: 'Category'
      },
      comment: {
        arguments: { id: 'ID' },
        type: 'Comment'
      },
      link: {
        arguments: { id: 'ID', name: 'String' },
        type: 'Link'
      },
      option: {
        arguments: { name: 'String' },
        type: 'Link'
      },
      page: {
        arguments: { id: 'ID', slug: 'String' },
        type: 'Page'
      },
      post: {
        arguments: { id: 'ID', slug: 'String' },
        type: 'Post'
      },
      posts: {
        arguments: { limit: 'Int', offset: 'Int', orderBy: 'String', order: 'String' },
        type: '[Post]'
      },
      user: {
        arguments: { id: 'ID', slug: 'String' },
        type: 'User'
      }
    };
  }
    
  initResolvers() {
    const models = this.options.models;
    const options = this.options;
    
    return {
      attachment: (_, args) => {
        return models.Attachment.find({ where: args });
      },
      category: (_, args) => {
        return models.Term.find({ where: args });
      },
      comment: (_, args) => {
        return models.Comment.find({ where: args });
      },
      link: (_, args) => {
        return models.Link.find({ where: args });
      },
      option: (_, args) => {
        const optionWhitelist = Array.isArray(options.optionWhitelist) ? options.optionWhitelist : [];
        return models.Option.find({ where: args }).then((option) => {
          // want to check that the option is whitelisted so we don't leak private information
          // we do it here to allow future elevated user permissions and other query formats
          return (
            optionWhitelist.indexOf(option.name) > -1 ||
            optionWhitelist.filter(o => RegExp(`^${o}$`).test(option.name)).length > 0
          ) ? option : null;
        });
      },
      page: (_, args) => {
        return models.Page.find({ where: args });
      },
      post: (_, args) => {
        return models.Post.find({ where: args });
      },
      posts: (_, args) => {
        return models.Post.findAll(this.decomposeArgs(args));
      },
      user: (_, args) => {
        return models.User.find({ where: args });
      }
    }
  }

};