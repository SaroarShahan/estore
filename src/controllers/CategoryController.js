const { CategoryServices } = require('../services/CategoryServices');

const categoryServices = new CategoryServices();

class CategoryController {
  constructor(categoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async getAllCategories(req, res, next) {
    try {
      const categories = await categoryServices.getAllCategories();

      res.status(200).json({
        status: true,
        message: 'Fetched all categories successfully',
        categories: categories,
      });
    } catch (error) {
      next(error);
    }
  }

  async getCategory(req, res, next) {
    try {
      const category = await categoryServices.getCategory(req.params.id);

      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }

      res.status(200).json({
        status: true,
        message: 'Fetched category successfully',
        category: category,
      });
    } catch (error) {
      next(error);
    }
  }

  async createCategory(req, res, next) {
    try {
      const newCategory = await categoryServices.createCategory(req.body);

      res.status(201).json({
        status: true,
        message: 'Category created successfully',
        category: newCategory,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateCategory(req, res, next) {
    try {
      const updatedCategory = await categoryServices.updateCategory(req.params.id, req.body);

      if (!updatedCategory) {
        return res.status(404).json({ message: 'Category not found' });
      }

      res.status(200).json({
        status: true,
        message: 'Category updated successfully',
        category: updatedCategory,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteCategory(req, res, next) {
    try {
      const deletedCategory = await categoryServices.deleteCategory(req.params.id);

      if (!deletedCategory) {
        return res.status(404).json({ message: 'Category not found' });
      }

      res.status(200).json({
        status: true,
        message: 'Category deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { CategoryController };
