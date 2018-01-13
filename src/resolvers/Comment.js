const typeDef = `
type Comment {
  id: Int!
  postId: Int
  author: String
  createdAt: String
  content: String
  type: String
  user: User
  meta: [CommentMeta]
}
`;

const resolver = {
  user(comment) {
    return comment.getUser();
  },
  meta(comment) {
    return comment.getCommentMeta();
  }
};

export default { resolver, typeDef };