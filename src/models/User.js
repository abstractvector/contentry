export default function(sequelize, DataTypes) {
  return sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    displayName: {
      type: DataTypes.STRING,
      field: 'display_name'
    },
    slug: {
      type: DataTypes.STRING,
      field: 'user_nicename'
    }
  }, {
    tableName: 'users'
  });
};