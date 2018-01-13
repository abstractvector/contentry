export function createRelationships(m) {
  // things belong to users
  m.Attachment.belongsTo(m.User, { as: 'Author', foreignKey: 'post_author' });
  m.Comment.belongsTo(m.User, { foreignKey: 'user_id' });
  m.Link.belongsTo(m.User, { foreignKey: 'link_owner' });
  m.Page.belongsTo(m.User, { as: 'Author', foreignKey: 'post_author' });
  m.Post.belongsTo(m.User, { as: 'Author', foreignKey: 'post_author' });

  // users have things
  m.User.hasMany(m.Attachment, { foreignKey: 'post_author' });
  m.User.hasMany(m.Comment, { foreignKey: 'user_id' });
  m.User.hasMany(m.Link, { foreignKey: 'link_owner' });
  m.User.hasMany(m.Page, { foreignKey: 'post_author' });
  m.User.hasMany(m.Post, { foreignKey: 'post_author' });

  // pages and comments can have parents
  m.Attachment.belongsTo(m.Attachment, { as: 'Parent', foreignKey: 'post_parent' });
  m.Comment.belongsTo(m.Comment, { as: 'Parent', foreignKey: 'comment_parent' });
  m.Page.belongsTo(m.Page, { as: 'Parent', foreignKey: 'post_parent' });
  
  // things have meta data
  m.Attachment.hasMany(m.PostMeta, { foreignKey: 'post_id' });
  m.Comment.hasMany(m.CommentMeta, { foreignKey: 'comment_id' });
  m.Page.hasMany(m.PostMeta, { foreignKey: 'post_id' });
  m.Post.hasMany(m.PostMeta, { foreignKey: 'post_id' });
  m.Term.hasMany(m.TermMeta, { foreignKey: 'term_id' });
  m.User.hasMany(m.UserMeta, { foreignKey: 'user_id' });

  // posts and pages have comments
  m.Attachment.hasMany(m.Comment, { foreignKey: 'comment_post_ID'} );
  m.Page.hasMany(m.Comment, { foreignKey: 'comment_post_ID'} );
  m.Post.hasMany(m.Comment, { foreignKey: 'comment_post_ID'} );

  // things have terms
  m.Attachment.belongsToMany(m.TermTaxonomy, { through: { model: m.TermRelationship, unique: false }, foreignKey: 'object_id', constraints: false });
  m.Page.belongsToMany(m.TermTaxonomy, { through: { model: m.TermRelationship, unique: false }, foreignKey: 'object_id', constraints: false });
  m.Post.belongsToMany(m.TermTaxonomy, { through: { model: m.TermRelationship, unique: false }, foreignKey: 'object_id', constraints: false });
  m.TermTaxonomy.belongsToMany(m.Attachment, { through: { model: m.TermRelationship, unique: false }, foreignKey: 'term_taxonomy_id', constraints: false });
  m.TermTaxonomy.belongsToMany(m.Page, { through: { model: m.TermRelationship, unique: false }, foreignKey: 'term_taxonomy_id', constraints: false });
  m.TermTaxonomy.belongsToMany(m.Post, { through: { model: m.TermRelationship, unique: false }, foreignKey: 'term_taxonomy_id', constraints: false });

  // terms have taxonomies
  m.TermTaxonomy.belongsTo(m.Term, { foreignKey: 'term_id' });
};