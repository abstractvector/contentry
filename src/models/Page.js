export default function(sequelize, DataTypes) {
  return sequelize.define('Page', {
    id: {
      type: DataTypes.INTEGER,
      field: 'ID',
      primaryKey: true
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'post_date'
    },
    createdAtGmt: {
      type: DataTypes.DATE,
      field: 'post_date_gmt'
    },
    content: {
      type: DataTypes.STRING,
      field: 'post_content'
    },
    name: {
      type: DataTypes.STRING,
      field: 'post_title'
    },
    excerpt: {
      type: DataTypes.STRING,
      field: 'post_excerpt'
    },
    status: {
      type: DataTypes.STRING,
      field: 'post_status'
    },
    commentStatus: {
      type: DataTypes.STRING,
      field: 'comment_status'
    },
    pingStatus: {
      type: DataTypes.STRING,
      field: 'ping_status'
    },
    password: {
      type: DataTypes.STRING,
      field: 'post_password'
    },
    slug: {
      type: DataTypes.STRING,
      field: 'post_name'
    },
    toPing: {
      type: DataTypes.STRING,
      field: 'to_ping'
    },
    pinged: {
      type: DataTypes.STRING,
      field: 'pinged'
    },
    modifiedAt: {
      type: DataTypes.DATE,
      field: 'post_modified'
    },
    modifiedAtGmt: {
      type: DataTypes.DATE,
      field: 'post_modified_gmt'
    },
    contentFiltered: {
      type: DataTypes.STRING,
      field: 'post_content_filtered'
    },
    parent: {
      type: DataTypes.INTEGER,
      field: 'post_parent'
    },
    guid: {
      type: DataTypes.STRING,
      field: 'guid'
    },
    menuOrder: {
      type: DataTypes.INTEGER,
      field: 'menu_order'
    },
    type: {
      type: DataTypes.STRING,
      field: 'post_type'
    },
    mimeType: {
      type: DataTypes.STRING,
      field: 'post_mime_type'
    },
    commentCount: {
      type: DataTypes.INTEGER,
      field: 'comment_count'
    }
  }, {
    tableName: 'posts',
    defaultScope: {
      where: {
        post_type: 'page',
        post_status: 'publish'
      }
    }
  });
};