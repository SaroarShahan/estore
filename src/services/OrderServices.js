const { OrderRepository } = require('../repository/Order/OrderRepository');

class OrderServices {
  constructor() {
    if (OrderServices.instance) return OrderServices.instance;

    this.orderRepository = new OrderRepository();
    OrderServices.instance = this;
  }

  async getAllOrders(req) {
    const { page } = req.query;
    const { rows, count, limit } = await this.orderRepository.findAndCountAllOrders(req.query);

    return {
      totalCount: count,
      orders: rows,
      page: page ? +page : 1,
      limit: limit ? +limit : count,
      totalPage: limit ? Math.ceil(count / +limit) : 1,
    };
  }

  async getOrder(id) {
    return this.orderRepository.findById(id);
  }

  async createOrder(data) {
    return this.orderRepository.create(data);
  }

  async updateOrder(id, data) {
    return this.orderRepository.update(id, data);
  }

  async deleteOrder(id) {
    return this.orderRepository.delete(id);
  }
}

module.exports = { OrderServices };
