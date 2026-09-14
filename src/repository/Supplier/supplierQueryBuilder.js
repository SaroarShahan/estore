const { limitAndOffsetBuilder } = require('../../utils');

const buildSupplierQuery = (query = {}) => ({
  where:
    typeof query.isActive === 'undefined'
      ? {}
      : { isActive: query.isActive === true || query.isActive === 'true' },
  ...limitAndOffsetBuilder(query),
  order:
    query.sortBy && query.orderBy
      ? [[query.sortBy, query.orderBy.toUpperCase()]]
      : [['created_at', 'desc']],
});

module.exports = { buildSupplierQuery };
