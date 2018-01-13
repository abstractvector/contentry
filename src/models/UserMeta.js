export default function(sequelize, DataTypes) {
  return sequelize.define('UserMeta', {
    id: {
      type: DataTypes.INTEGER,
      field: 'umeta_id',
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      field: 'user_id'
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
    tableName: 'usermeta'
  });
};