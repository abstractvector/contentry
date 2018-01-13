export default function(sequelize, DataTypes) {
  return sequelize.define('TermTaxonomy', {
    id: {
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
    },
    description: {
      type: DataTypes.STRING,
      field: 'description'
    },
    parent: {
      type: DataTypes.INTEGER,
      field: 'parent'
    },
    count: {
      type: DataTypes.INTEGER,
      field: 'count'
    }
  }, {
    tableName: 'term_taxonomy'
  });
};