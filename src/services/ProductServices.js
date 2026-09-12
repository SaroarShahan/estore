const { ProductRepository } = require('../repository/ProductRepository');

class ProductServices {
  constructor() {
    if (ProductServices.instance) return ProductServices.instance;

    this.productRepository = new ProductRepository();
    ProductServices.instance = this;
  }

  async getAllProducts() {
    return await this.productRepository.findAll();
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
