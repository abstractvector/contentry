export default function(sequelize, DataTypes) {
  return sequelize.define('Comment', {
    id: {
      type: DataTypes.INTEGER,
      field: 'ID',
      primaryKey: true
    },
    postId: {
      type: DataTypes.INTEGER,
      field: 'comment_post_ID'
    },
    author: {
      type: DataTypes.STRING,
      field: 'comment_author'
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'comment_date'
    },
    content: {
      type: DataTypes.STRING,
      field: 'comment_content'
    },
    type: {
      type: DataTypes.STRING,
      field: 'comment_type'
    },
    userId: {
      type: DataTypes.INTEGER,
      field: 'user_id'
    }
  }, {
    tableName: 'comments',
    defaultScope: {
      where: {
        approved: 1
      }
    }
  });
};