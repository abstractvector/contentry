export default function(sequelize, DataTypes) {
  return sequelize.define('Post', {
    id: {
      type: DataTypes.INTEGER,
      field: 'ID',
      primaryKey: true
    },
    slug: {
      type: DataTypes.STRING,
      field: 'post_name'
    },
    name: {
      type: DataTypes.STRING,
      field: 'post_title'
    },
    content: {
      type: DataTypes.STRING,
      field: 'post_content'
    },
    excerpt: {
      type: DataTypes.STRING,
      field: 'post_excerpt'
    },
    status: {
      type: DataTypes.STRING,
      field: 'post_status'
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'post_date'
    },
    modifiedAt: {
      type: DataTypes.DATE,
      field: 'post_modified'
    }
  }, {
    tableName: 'posts',
    defaultScope: {
      where: {
        post_type: 'post'
      }
    }
  });
};