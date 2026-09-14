const { Op } = require('sequelize');
const { limitAndOffsetBuilder } = require('../../utils');

const buildOrderQuery = (query = {}) => {
  const where = {};
  if (query.customerId) where.customerId = query.customerId;
  if (query.status) where.status = query.status;
  if (typeof query.minTotalAmount !== 'undefined' || typeof query.maxTotalAmount !== 'undefined') {
    where.totalAmount = {
      ...(typeof query.minTotalAmount !== 'undefined' && { [Op.gte]: query.minTotalAmount }),
      ...(typeof query.maxTotalAmount !== 'undefined' && { [Op.lte]: query.maxTotalAmount }),
    };
  }
  return {
    where,
    ...limitAndOffsetBuilder(query),
    order:
      query.sortBy && query.orderBy
        ? [[query.sortBy, query.orderBy.toUpperCase()]]
        : [['created_at', 'desc']],
  };
};

module.exports = { buildOrderQuery };
