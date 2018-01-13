export default function(sequelize, DataTypes) {
  return sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      field: 'ID',
      primaryKey: true
    },
    login: {
      type: DataTypes.STRING,
      field: 'user_login'
    },
    passwordHash: {
      type: DataTypes.STRING,
      field: 'user_pass'
    },
    niceName: {
      type: DataTypes.STRING,
      field: 'user_nicename'
    },
    email: {
      type: DataTypes.STRING,
      field: 'user_email'
    },
    url: {
      type: DataTypes.STRING,
      field: 'user_url'
    },
    registeredAt: {
      type: DataTypes.DATE,
      field: 'user_registered'
    },
    activationKey: {
      type: DataTypes.STRING,
      field: 'user_activation_key'
    },
    status: {
      type: DataTypes.INTEGER,
      field: 'user_status'
    },
    displayName: {
      type: DataTypes.STRING,
      field: 'display_name'
    }
  }, {
    tableName: 'users'
  });
};