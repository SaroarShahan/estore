const { OrderModel } = require('../models');

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
