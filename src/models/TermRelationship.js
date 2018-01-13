export default function(sequelize, DataTypes) {
  return sequelize.define('TermRelationship', {
    objectId: {
      type: DataTypes.INTEGER,
      field: 'object_id',
      primaryKey: true
    },
    taxonomyId: {
      type: DataTypes.INTEGER,
      field: 'term_taxonomy_id'
    },
    order: {
      type: DataTypes.INTEGER,
      field: 'term_order'
    }
  }, {
    tableName: 'term_relationships'
  });
};