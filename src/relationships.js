export function createRelationships(m) {
  // posts and pages both have authors
  m.Post.belongsTo(m.User, { as: 'Author', foreignKey: 'post_author' });
  m.Page.belongsTo(m.User, { as: 'Author', foreignKey: 'post_author' });
  m.Comment.belongsTo(m.User, { foreignKey: 'user_id' });

  // users have posts and pages
  m.User.hasMany(m.Post, { foreignKey: 'post_author' });
  m.User.hasMany(m.Page, { foreignKey: 'post_author' });

  // pages can have page parents
  m.Page.belongsTo(m.Page, { as: 'Parent', foreignKey: 'post_parent' });

  // comments have meta
  m.Comment.hasMany(m.CommentMeta, { foreignKey: 'comment_id' });

  // posts and pages have comments
  m.Page.hasMany(m.Comment, { foreignKey: 'comment_post_ID'} );
  m.Post.hasMany(m.Comment, { foreignKey: 'comment_post_ID'} );

  // posts can belong to zero or more categories, and categories contain zero or more posts; same with pages
  m.Post.belongsToMany(m.TermTaxonomy, { through: { model: m.TaxonomyRelationship, unique: false }, foreignKey: 'object_id', constraints: false });
  m.Page.belongsToMany(m.TermTaxonomy, { through: { model: m.TaxonomyRelationship, unique: false }, foreignKey: 'object_id', constraints: false });
  m.TermTaxonomy.belongsToMany(m.Post, { through: { model: m.TaxonomyRelationship, unique: false }, foreignKey: 'term_taxonomy_id', constraints: false });
  m.TermTaxonomy.belongsToMany(m.Page, { through: { model: m.TaxonomyRelationship, unique: false }, foreignKey: 'term_taxonomy_id', constraints: false });

  // terms have taxonomies
  m.TermTaxonomy.belongsTo(m.Term, { foreignKey: 'term_id' });
};