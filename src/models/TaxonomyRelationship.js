export default function(sequelize, DataTypes) {
  return sequelize.define('TaxonomyRelationship', {
    objectId: {
      type: DataTypes.INTEGER,
      field: 'object_id',
      primaryKey: true
    },
    termTaxonomyId: {
      type: DataTypes.STRING,
      field: 'term_taxonomy_id'
    }
  }, {
    tableName: 'term_relationships',
    underscored: false
  });
};