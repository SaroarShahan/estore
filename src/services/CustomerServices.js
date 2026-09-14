const { CustomerRepository } = require('../repository/Customer/CustomerRepository');

class CustomerServices {
  constructor() {
    if (CustomerServices.instance) return CustomerServices.instance;

    this.customerRepository = new CustomerRepository();
    CustomerServices.instance = this;
  }

  async getAllCustomers(req) {
    const { page } = req.query;
    const { rows, count, limit } = await this.customerRepository.findAndCountAllCustomers(
      req.query,
    );

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
