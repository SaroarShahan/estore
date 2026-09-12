const { SupplierRepository } = require('../repository/SupplierRepository');

class SupplierServices {
  constructor() {
    if (SupplierServices.instance) return SupplierServices.instance;

    this.supplierRepository = new SupplierRepository();
    SupplierServices.instance = this;
  }

  async getAllSuppliers() {
    return await this.supplierRepository.findAll();
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
