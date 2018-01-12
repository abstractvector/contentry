export default function(sequelize, DataTypes) {
  return sequelize.define('Link', {
    id: {
      type: DataTypes.INTEGER,
      field: 'link_id',
      primaryKey: true
    },
    url: {
      type: DataTypes.STRING,
      field: 'link_url'
    },
    name: {
      type: DataTypes.STRING,
      field: 'link_name'
    },
    image: {
      type: DataTypes.STRING,
      field: 'link_image'
    },
    target: {
      type: DataTypes.STRING,
      field: 'link_target'
    },
    description: {
      type: DataTypes.STRING,
      field: 'link_description'
    },
    rating: {
      type: DataTypes.INTEGER,
      field: 'link_rating'
    },
    modifiedAt: {
      type: DataTypes.DATE,
      field: 'link_updated'
    },
    rel: {
      type: DataTypes.STRING,
      field: 'link_rel'
    },
    notes: {
      type: DataTypes.STRING,
      field: 'link_notes'
    }
  }, {
    tableName: 'links',
    defaultScope: {
      where: {
        visible: 'Y'
      }
    }
  });
};