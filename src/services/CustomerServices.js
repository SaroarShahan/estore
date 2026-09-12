const { Op } = require('sequelize');
const { CustomerRepository } = require('../repository/CustomerRepository');
const { limitAndOffsetBuilder } = require('./../utils');

class CustomerServices {
  constructor() {
    if (CustomerServices.instance) return CustomerServices.instance;

    this.customerRepository = new CustomerRepository();
    CustomerServices.instance = this;
  }

  async getAllCustomers(req) {
    const options = {};
    const { page } = req.query;
    const { limit, offset } = limitAndOffsetBuilder(req.query);

    if (req.query.search) {
      const searchTerm = req.query.search;

      options.where = {
        ...options.where,
        [Op.or]: [
          { name: { [Op.iLike]: `%${searchTerm}%` } },
          { email: { [Op.iLike]: `%${searchTerm}%` } },
          { phone: { [Op.iLike]: `%${searchTerm}%` } },
        ],
      };
    }

    if (req.query.sortBy && req.query.orderBy) {
      const field = req.query.sortBy;
      const order = req.query.orderBy;
      options.order = [[field, order.toUpperCase()]];
    }

    const { rows, count } = await this.customerRepository.findAndCountAll({
      where: options.where || {},
      limit,
      offset,
      order: options.order || [['created_at', 'desc']],
    });

    return {
      totalCount: count,
      customers: rows,
      page: page ? +page : 1,
      limit: limit ? +limit : count,
      totalPage: limit ? Math.ceil(count / +limit) : 1,
    };
  }

  async getCustomer(id) {
    return this.customerRepository.findById(id);
  }

  async createCustomer(data) {
    return this.customerRepository.create(data);
  }

  async updateCustomer(id, data) {
    return this.customerRepository.update(id, data);
  }

  async deleteCustomer(id) {
    return this.customerRepository.delete(id);
  }
}

module.exports = { CustomerServices };
