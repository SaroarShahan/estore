const { SupplierModel } = require('../models');

class SupplierRepository {
  constructor() {
    if (SupplierRepository.instance) return SupplierRepository.instance;

    SupplierRepository.instance = this;
  }

  async create(data) {
    return SupplierModel.create(data);
  }

  async findAndCountAll(options) {
    return SupplierModel.findAndCountAll(options);
  }

  async findById(id) {
    return SupplierModel.findByPk(id);
  }

  async update(id, data) {
    const supplier = await SupplierModel.findByPk(id);

    if (!supplier) return null;

    return supplier.update(data);
  }

  async delete(id) {
    const supplier = await SupplierModel.findByPk(id);

    if (!supplier) return null;

    return supplier.destroy();
  }
}

module.exports = { SupplierRepository };
