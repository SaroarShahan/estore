const { ProductModel } = require('../models');

class ProductRepository {
  constructor() {
    if (ProductRepository.instance) return ProductRepository.instance;

    ProductRepository.instance = this;
  }

  async create(data) {
    return ProductModel.create(data);
  }

  async findAll() {
    return ProductModel.findAll();
  }

  async findById(id) {
    return ProductModel.findByPk(id);
  }

  async update(id, data) {
    const product = await ProductModel.findByPk(id);

    if (!product) return null;

    return product.update(data);
  }

  async delete(id) {
    const product = await ProductModel.findByPk(id);

    if (!product) return null;

    return product.destroy();
  }
}

module.exports = { ProductRepository };
