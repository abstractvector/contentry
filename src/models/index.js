import fs from 'fs';

import Sequelize from 'sequelize';

const sequelize = new Sequelize('mysql://root@127.0.0.1/wordpress', {
  operatorsAliases: false,
  define: {
    underscored: true,
    timestamps: false
  }
});

// add a tableName prefix to all tables here
sequelize.addHook('beforeDefine', (attributes, options) => {
  options.tableName = 'wp_' + options.tableName;
});

// load in all the models
const models = fs.readdirSync(__dirname)
  .map(f => f.substr(0, f.indexOf('.js')))
  .filter(f => 'index' !== f);

models.forEach(function(model) {
  module.exports[model] = sequelize.import(__dirname + '/' + model);
});

// desribe relationships
((m) => {
  // posts and pages both have authors
  m.Post.belongsTo(m.User, { as: 'Author', foreignKey: 'post_author' });
  m.Page.belongsTo(m.User, { as: 'Author', foreignKey: 'post_author' });

  // users have posts and pages
  m.User.hasMany(m.Post, { foreignKey: 'post_author' });
  m.User.hasMany(m.Page, { foreignKey: 'post_author' });

  // pages can have page parents
  m.Page.belongsTo(m.Page, { as: 'Parent', foreignKey: 'post_parent' });

  // posts can belong to zero or more categories, and categories contain zero or more posts; same with pages
  m.Post.belongsToMany(m.TermTaxonomy, { through: { model: m.TaxonomyRelationship, unique: false }, foreignKey: 'object_id', constraints: false });
  m.Page.belongsToMany(m.TermTaxonomy, { through: { model: m.TaxonomyRelationship, unique: false }, foreignKey: 'object_id', constraints: false });

  m.TermTaxonomy.belongsToMany(m.Post, { through: { model: m.TaxonomyRelationship, unique: false }, foreignKey: 'term_taxonomy_id', constraints: false });
  m.TermTaxonomy.belongsTo(m.Term, { foreignKey: 'term_id' });
})(module.exports);

// export connection
export { sequelize };