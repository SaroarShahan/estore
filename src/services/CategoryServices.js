const { CategoryRepository } = require('../repository/Category/CategoryRepository');

class CategoryServices {
  constructor() {
    if (CategoryServices.instance) return CategoryServices.instance;

    this.categoryRepository = new CategoryRepository();
    CategoryServices.instance = this;
  }

  async getAllCategories(req) {
    const { page } = req.query;
    const { rows, count, limit } = await this.categoryRepository.findAndCountAllCategories(
      req.query,
    );

    return {
      totalCount: count,
      categories: rows,
      page: page ? +page : 1,
      limit: limit ? +limit : count,
      totalPage: limit ? Math.ceil(count / +limit) : 1,
    };
  }

  async getCategory(id) {
    return await this.categoryRepository.findById(id);
  }

  async createCategory(data) {
    return await this.categoryRepository.create(data);
  }

  async updateCategory(id, data) {
    return await this.categoryRepository.update(id, data);
  }

  async deleteCategory(id) {
    return await this.categoryRepository.delete(id);
  }
}

module.exports = { CategoryServices };
