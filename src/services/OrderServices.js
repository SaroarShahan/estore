const { Op } = require('sequelize');
const { CustomerModel, OrderItemModel } = require('../models');
const { OrderRepository } = require('../repository/OrderRepository');
const { limitAndOffsetBuilder } = require('./../utils');

class OrderServices {
  constructor() {
    if (OrderServices.instance) return OrderServices.instance;

    this.orderRepository = new OrderRepository();
    OrderServices.instance = this;
  }

  async getAllOrders(req) {
    const options = {};
    const { page, customerId, status, minTotalAmount, maxTotalAmount } = req.query;
    const { limit, offset } = limitAndOffsetBuilder(req.query);

    if (customerId) {
      options.where = { ...options.where, customerId };
    }

    if (status) {
      options.where = { ...options.where, status };
    }

    if (minTotalAmount || maxTotalAmount) {
      options.where = {
        ...options.where,
        totalAmount: {
          ...(minTotalAmount && { [Op.gte]: minTotalAmount }),
          ...(maxTotalAmount && { [Op.lte]: maxTotalAmount }),
        },
      };
    }

    if (req.query.sortBy && req.query.orderBy) {
      const field = req.query.sortBy;
      const order = req.query.orderBy;
      options.order = [[field, order.toUpperCase()]];
    }

    const { rows, count } = await this.orderRepository.findAndCountAll({
      include: [
        { model: CustomerModel, as: 'customer', attributes: ['id', 'name', 'email'] },
        { model: OrderItemModel, as: 'items' },
      ],
      where: options.where || {},
      limit,
      offset,
      order: options.order || [['created_at', 'desc']],
      distinct: true,
    });

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
