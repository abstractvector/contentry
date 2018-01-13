export default function(sequelize, DataTypes) {
  return sequelize.define('Comment', {
    id: {
      type: DataTypes.INTEGER,
      field: 'comment_ID',
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
    authorEmail: {
      type: DataTypes.STRING,
      field: 'comment_author_email'
    },
    authorUrl: {
      type: DataTypes.STRING,
      field: 'comment_author_url'
    },
    authorIP: {
      type: DataTypes.STRING,
      field: 'comment_author_ip'
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'comment_date'
    },
    content: {
      type: DataTypes.STRING,
      field: 'comment_content'
    },
    karma: {
      type: DataTypes.INTEGER,
      field: 'comment_karma'
    },
    approved: {
      type: DataTypes.STRING,
      field: 'comment_approved'
    },
    agent: {
      type: DataTypes.STRING,
      field: 'comment_agent'
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
        comment_approved: 1
      }
    }
  });
};