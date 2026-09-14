const { Op } = require('sequelize');
const { limitAndOffsetBuilder } = require('../../utils');

const buildProductQuery = (query = {}) => {
  const where = {};
  const { limit, offset } = limitAndOffsetBuilder(query);

  if (query.categoryId) {
    where.categoryId = query.categoryId;
  }

  if (query.supplierId) {
    where.supplierId = query.supplierId;
  }

  if (typeof query.minPrice !== 'undefined' || typeof query.maxPrice !== 'undefined') {
    where.price = {
      ...(query.minPrice && { [Op.gte]: query.minPrice }),
      ...(query.maxPrice && { [Op.lte]: query.maxPrice }),
    };
  }

  if (typeof query.isActive !== 'undefined') {
    where.isActive = query.isActive === true || query.isActive === 'true';
  }

  if (query.search) {
    where[Op.or] = [
      { name: { [Op.iLike]: `%${query.search}%` } },
      { sku: { [Op.iLike]: `%${query.search}%` } },
    ];
  }

  const order =
    query.sortBy && query.orderBy
      ? [[query.sortBy, query.orderBy.toUpperCase()]]
      : [['created_at', 'desc']];

  return { where, limit, offset, order };
};

module.exports = { buildProductQuery };
