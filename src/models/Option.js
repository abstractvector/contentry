export default function(sequelize, DataTypes) {
  return sequelize.define('Option', {
    id: {
      type: DataTypes.INTEGER,
      field: 'option_id',
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      field: 'option_name'
    },
    value: {
      type: DataTypes.STRING,
      field: 'option_value'
    }
  }, {
    tableName: 'options'
  });
};