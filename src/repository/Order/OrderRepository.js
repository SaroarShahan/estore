const { CustomerModel, OrderItemModel, OrderModel } = require('../../models');
const { buildOrderQuery } = require('./orderQueryBuilder');

class OrderRepository {
  constructor() {
    if (OrderRepository.instance) return OrderRepository.instance;

    OrderRepository.instance = this;
  }

  async create(data) {
    return OrderModel.create(data);
  }

  async findAndCountAll(options) {
    return OrderModel.findAndCountAll(options);
  }

  async findAndCountAllOrders(query) {
    const options = buildOrderQuery(query);
    return {
      ...(await OrderModel.findAndCountAll({
        ...options,
        include: [
          { model: CustomerModel, as: 'customer', attributes: ['id', 'name', 'email'] },
          { model: OrderItemModel, as: 'items' },
        ],
        distinct: true,
      })),
      limit: options.limit,
    };
  }

  async findById(id) {
    return OrderModel.findByPk(id);
  }

  async update(id, data) {
    const order = await OrderModel.findByPk(id);

    if (!order) return null;

    return order.update(data);
  }

  async delete(id) {
    const order = await OrderModel.findByPk(id);

    if (!order) return null;

    return order.destroy();
  }
}

module.exports = { OrderRepository };
