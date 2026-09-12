const { SupplierRepository } = require('../repository/SupplierRepository');
const { limitAndOffsetBuilder } = require('./../utils');

class SupplierServices {
  constructor() {
    if (SupplierServices.instance) return SupplierServices.instance;

    this.supplierRepository = new SupplierRepository();
    SupplierServices.instance = this;
  }

  async getAllSuppliers(req) {
    const options = {};
    const { page } = req.query;
    const { limit, offset } = limitAndOffsetBuilder(req.query);

    if (req.query.sortBy && req.query.orderBy) {
      const field = req.query.sortBy;
      const order = req.query.orderBy;
      options.order = [[field, order.toUpperCase()]];
    }

    if (typeof req.query.isActive !== 'undefined') {
      options.where = { ...options.where, isActive: req.query.isActive === 'true' };
    }

    const { rows, count } = await this.supplierRepository.findAndCountAll({
      where: options.where || {},
      limit,
      offset,
      order: options.order || [['created_at', 'desc']],
    });

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
