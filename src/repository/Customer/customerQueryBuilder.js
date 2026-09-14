const { Op } = require('sequelize');
const {
  CategoryModel,
  OrderItemModel,
  OrderModel,
  ProductModel,
} = require('../../models');
const { limitAndOffsetBuilder } = require('../../utils');

const buildCustomerQuery = (query = {}) => ({
    where: query.search
      ? {
          [Op.or]: [
            { name: { [Op.iLike]: `%${query.search}%` } },
            { email: { [Op.iLike]: `%${query.search}%` } },
            { phone: { [Op.iLike]: `%${query.search}%` } },
          ],
        }
      : {},
    ...limitAndOffsetBuilder(query),
    order:
      query.sortBy && query.orderBy
        ? [[query.sortBy, query.orderBy.toUpperCase()]]
        : [['created_at', 'desc']],
    attributes: ['id', 'name', 'email', 'phone', 'address'],
    include: [
      {
        model: OrderModel,
        as: 'orders',
        attributes: ['id', 'totalAmount', 'status', 'createdAt'],
        include: [
          {
            model: OrderItemModel,
            as: 'items',
            attributes: ['id', 'quantity', 'unitPrice', 'subtotal'],
            include: [
              {
                model: ProductModel,
                as: 'product',
                attributes: ['id', 'name', 'sku', 'price'],
                include: [
                  {
                    model: CategoryModel,
                    as: 'category',
                    attributes: ['id', 'name'],
                    where: { name: 'Electronics' },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  });

module.exports = { buildCustomerQuery };
