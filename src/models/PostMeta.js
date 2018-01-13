export default function(sequelize, DataTypes) {
  return sequelize.define('PostMeta', {
    id: {
      type: DataTypes.INTEGER,
      field: 'meta_id',
      primaryKey: true
    },
    postId: {
      type: DataTypes.INTEGER,
      field: 'post_id'
    },
    key: {
      type: DataTypes.STRING,
      field: 'meta_key'
    },
    value: {
      type: DataTypes.DATE,
      field: 'meta_value'
    }
  }, {
    tableName: 'postmeta'
  });
};