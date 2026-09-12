const { ProductRepository } = require('../repository/ProductRepository');
const { limitAndOffsetBuilder } = require('./../utils');
const { SupplierModel, CategoryModel } = require('../models');

class ProductServices {
  constructor() {
    if (ProductServices.instance) return ProductServices.instance;

    this.productRepository = new ProductRepository();
    ProductServices.instance = this;
  }

  async getAllProducts(req) {
    const options = {};
    const { page } = req.query;
    const { limit, offset } = limitAndOffsetBuilder(req.query);

    if (req.query.categoryId) {
      options.where = { ...options.where, categoryId: req.query.categoryId };
    }

    if (req.query.supplierId) {
      options.where = { ...options.where, supplierId: req.query.supplierId };
    }

    if (req.query.sortBy && req.query.orderBy) {
      const field = req.query.sortBy;
      const order = req.query.orderBy;
      options.order = [[field, order.toUpperCase()]];
    }

    if (typeof req.query.isActive !== 'undefined') {
      options.where = { ...options.where, isActive: req.query.isActive === 'true' };
    }

    const { rows, count } = await this.productRepository.findAndCountAll({
      include: [
        { model: SupplierModel, as: 'supplier' },
        { model: CategoryModel, as: 'category' },
      ],
      where: options.where || {},
      limit,
      offset,
      order: options.order || [['created_at', 'desc']],
    });

    return {
      totalCount: count,
      products: rows,
      page: page ? +page : 1,
      limit: limit ? +limit : count,
      totalPage: limit ? Math.ceil(count / +limit) : 1,
    };
  }

  async getProduct(id) {
    return await this.productRepository.findById(id);
  }

  async createProduct(data) {
    return await this.productRepository.create(data);
  }

  async updateProduct(id, data) {
    return await this.productRepository.update(id, data);
  }

  async deleteProduct(id) {
    return await this.productRepository.delete(id);
  }
}

module.exports = { ProductServices };
