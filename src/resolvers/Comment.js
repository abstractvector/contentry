const typeDef = `
type Comment {
  id: ID!
  postId: Int
  author: String
  createdAt: String
  content: String
  type: String
  user: User
  meta: [CommentMeta]
  parent: Comment
}
`;

const resolver = {
  parent(comment) {
    return comment.getParent();
  },
  user(comment) {
    return comment.getUser();
  },
  meta(comment) {
    return comment.getCommentMeta();
  }
};

export default { resolver, typeDef };