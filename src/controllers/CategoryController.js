const { CategoryServices } = require('../services/CategoryServices');
const { loggerContexts } = require('../constants/loggerContexts');
const { logger } = require('../utils');

const categoryServices = new CategoryServices();

class CategoryController {
  constructor(categoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async getAllCategories(req, res, next) {
    try {
      logger.info({
        message: 'Start executing method',
        context: loggerContexts.getAllCategories,
      });

      const categories = await categoryServices.getAllCategories(req);

      res.status(200).json({
        status: true,
        message: 'Fetched all categories successfully',
        data: categories,
      });
    } catch (error) {
      logger.error({
        error,
        context: loggerContexts.getAllCategories,
      });
      next(error);
    }
  }

  async getCategory(req, res, next) {
    try {
      logger.info({
        message: 'Start executing method',
        context: loggerContexts.getCategory,
      });

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
      logger.error({
        error,
        context: loggerContexts.getCategory,
      });
      next(error);
    }
  }

  async createCategory(req, res, next) {
    try {
      logger.info({
        message: 'Start executing method',
        context: loggerContexts.createCategory,
      });
      logger.info({
        message: 'Create Category Req Body',
        context: loggerContexts.createCategory,
        data: req.body,
      });

      const newCategory = await categoryServices.createCategory(req.body);

      res.status(201).json({
        status: true,
        message: 'Category created successfully',
        category: newCategory,
      });
    } catch (error) {
      logger.error({
        error,
        context: loggerContexts.createCategory,
      });
      next(error);
    }
  }

  async updateCategory(req, res, next) {
    try {
      logger.info({
        message: 'Start executing method',
        context: loggerContexts.updateCategory,
      });
      logger.info({
        message: 'Update Category Req Body',
        context: loggerContexts.updateCategory,
        data: req.body,
      });

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
      logger.error({
        error,
        context: loggerContexts.updateCategory,
      });
      next(error);
    }
  }

  async deleteCategory(req, res, next) {
    try {
      logger.info({
        message: 'Start executing method',
        context: loggerContexts.deleteCategory,
      });

      const deletedCategory = await categoryServices.deleteCategory(req.params.id);

      if (!deletedCategory) {
        return res.status(404).json({ message: 'Category not found' });
      }

      res.status(200).json({
        status: true,
        message: 'Category deleted successfully',
      });
    } catch (error) {
      logger.error({
        error,
        context: loggerContexts.deleteCategory,
      });
      next(error);
    }
  }
}

module.exports = { CategoryController };
