const { limitAndOffsetBuilder } = require('../../utils');

const buildCategoryQuery = (query = {}) => ({
  where: {},
  ...limitAndOffsetBuilder(query),
  order:
    query.sortBy && query.orderBy
      ? [[query.sortBy, query.orderBy.toUpperCase()]]
      : [['created_at', 'desc']],
});

module.exports = { buildCategoryQuery };
