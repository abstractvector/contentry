export default function(sequelize, DataTypes) {
  return sequelize.define('CommentMeta', {
    id: {
      type: DataTypes.INTEGER,
      field: 'meta_id',
      primaryKey: true
    },
    commentId: {
      type: DataTypes.INTEGER,
      field: 'comment_id'
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
    tableName: 'commentmeta'
  });
};