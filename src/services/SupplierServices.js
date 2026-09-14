const { SupplierRepository } = require('../repository/Supplier/SupplierRepository');

class SupplierServices {
  constructor() {
    if (SupplierServices.instance) return SupplierServices.instance;

    this.supplierRepository = new SupplierRepository();
    SupplierServices.instance = this;
  }

  async getAllSuppliers(req) {
    const { page } = req.query;
    const { rows, count, limit } = await this.supplierRepository.findAndCountAllSuppliers(
      req.query,
    );

    return {
      totalCount: count,
      suppliers: rows,
      page: page ? +page : 1,
      limit: limit ? +limit : count,
      totalPage: limit ? Math.ceil(count / +limit) : 1,
    };
  }

  async getSupplier(id) {
    return await this.supplierRepository.findById(id);
  }

  async createSupplier(data) {
    return await this.supplierRepository.create(data);
  }

  async updateSupplier(id, data) {
    return await this.supplierRepository.update(id, data);
  }

  async deleteSupplier(id) {
    return await this.supplierRepository.delete(id);
  }
}

module.exports = { SupplierServices };
