export default function(sequelize, DataTypes) {
  const TermTaxonomy = sequelize.define('TermTaxonomy', {
    id: {
      type: DataTypes.INTEGER,
      field: 'term_taxonomy_id',
      primaryKey: true
    },
    termId: {
      type: DataTypes.STRING,
      field: 'term_id'
    },
    taxonomy: {
      type: DataTypes.STRING,
      field: 'taxonomy'
    },
    description: {
      type: DataTypes.STRING,
      field: 'description'
    },
    parent: {
      type: DataTypes.INTEGER,
      field: 'parent'
    },
    count: {
      type: DataTypes.INTEGER,
      field: 'count'
    }
  }, {
    tableName: 'term_taxonomy'
  });

  TermTaxonomy.findAllDescendents = async (termId) => {
    let result = await TermTaxonomy.findOne({ where: { termId }});
    if (!result) {
      return [];
    }

    let parents = [result.termId];
    let queue = [result.termId];

    let i = 0;

    let parent, children;
    while (queue.length > 0) {
      if (++i > 128) {
        throw new Error('Uncontrolled iteration detected, aborting');
      }

      parent = queue[0];
      children = await TermTaxonomy.findAll({ where: { parent }});
      if (children.length > 0) {
        children.forEach(c => {
          queue.push(c.termId);
          parents.push(c.termId);
        });
      }
      queue = queue.filter(v => v !== parent)
    }

    return parents;
  };

  return TermTaxonomy;
};