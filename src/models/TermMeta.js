export default function(sequelize, DataTypes) {
  return sequelize.define('TermMeta', {
    id: {
      type: DataTypes.INTEGER,
      field: 'meta_id',
      primaryKey: true
    },
    termId: {
      type: DataTypes.INTEGER,
      field: 'term_id'
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
    tableName: 'termmeta'
  });
};