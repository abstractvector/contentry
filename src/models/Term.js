export default function(sequelize, DataTypes) {
  return sequelize.define('Term', {
    id: {
      type: DataTypes.INTEGER,
      field: 'term_id',
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      field: 'name'
    },
    slug: {
      type: DataTypes.STRING,
      field: 'slug'
    }
  }, {
    tableName: 'terms'
  });
};