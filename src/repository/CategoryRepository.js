const { CategoryModel } = require('../models');

class CategoryRepository {
  constructor() {
    if (CategoryRepository.instance) return CategoryRepository.instance;

    CategoryRepository.instance = this;
  }

  async create(data) {
    return CategoryModel.create(data);
  }

  async findAndCountAll(options) {
    return CategoryModel.findAndCountAll(options);
  }

  async findById(id) {
    return CategoryModel.findByPk(id);
  }

  async update(id, data) {
    const category = await CategoryModel.findByPk(id);

    if (!category) return null;

    return category.update(data);
  }

  async delete(id) {
    const category = await CategoryModel.findByPk(id);

    if (!category) return null;

    return category.destroy();
  }
}

module.exports = { CategoryRepository };
