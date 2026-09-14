const { ProductRepository } = require('../repository/Product/ProductRepository');

class ProductServices {
  constructor() {
    if (ProductServices.instance) return ProductServices.instance;

    this.productRepository = new ProductRepository();
    ProductServices.instance = this;
  }

  async getAllProducts(req) {
    const { page } = req.query;
    const { rows, count, limit } = await this.productRepository.findAndCountAllProducts(req.query);

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
