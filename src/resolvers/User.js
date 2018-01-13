import AbstractResolver from './AbstractResolver';

export default class User extends AbstractResolver {

  initFields() {
    return {
      id: 'ID!',
      displayName: 'String',
      posts: '[Post]'
    };
  }

  initResolvers() {
    return {
      posts(user) {
        return user.getPosts();
      }
    };
  }
  
}