const { CustomerModel } = require('../../models');
const { buildCustomerQuery } = require('./customerQueryBuilder');

class CustomerRepository {
  constructor() {
    if (CustomerRepository.instance) return CustomerRepository.instance;

    CustomerRepository.instance = this;
  }

  async create(data) {
    return CustomerModel.create(data);
  }

  async findAndCountAllCustomers(query) {
    const options = buildCustomerQuery(query);

    return {
      ...(await CustomerModel.findAndCountAll(options)),
      limit: options.limit,
    };
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
