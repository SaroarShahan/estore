const { CategoryRepository } = require('../repository/CategoryRepository');
const { limitAndOffsetBuilder } = require('./../utils');

class CategoryServices {
  constructor() {
    if (CategoryServices.instance) return CategoryServices.instance;

    this.categoryRepository = new CategoryRepository();
    CategoryServices.instance = this;
  }

  async getAllCategories(req) {
    const options = {};
    const { page } = req.query;
    const { limit, offset } = limitAndOffsetBuilder(req.query);

    if (req.query.sortBy && req.query.orderBy) {
      const field = req.query.sortBy;
      const order = req.query.orderBy;
      options.order = [[field, order.toUpperCase()]];
    }

    const { rows, count } = await this.categoryRepository.findAndCountAll({
      where: options.where || {},
      limit,
      offset,
      order: options.order || [['created_at', 'desc']],
    });

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
