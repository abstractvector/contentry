export default function(sequelize, DataTypes) {
  return sequelize.define('TermTaxonomy', {
    termTaxonomyId: {
      type: DataTypes.INTEGER,
      field: 'term_taxonomy_id',
      primaryKey: true
    },
    termId: {
      type: DataTypes.STRING,
      field: 'term_id'
    },
    taxonomy: {
      type: DataTypes.STRING,
      field: 'taxonomy'
    }
  }, {
    tableName: 'term_taxonomy'
  });
};