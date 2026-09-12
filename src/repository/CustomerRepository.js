const { CustomerModel } = require('../models');

class CustomerRepository {
  constructor() {
    if (CustomerRepository.instance) return CustomerRepository.instance;

    CustomerRepository.instance = this;
  }

  async create(data) {
    return CustomerModel.create(data);
  }

  async findAndCountAll(options) {
    return CustomerModel.findAndCountAll(options);
  }

  async findById(id) {
    return CustomerModel.findByPk(id);
  }

  async update(id, data) {
    const customer = await CustomerModel.findByPk(id);

    if (!customer) return null;

    return customer.update(data);
  }

  async delete(id) {
    const customer = await CustomerModel.findByPk(id);

    if (!customer) return null;

    return customer.destroy();
  }
}

module.exports = { CustomerRepository };
