const { CategoryServices } = require('../services/CategoryServices');
const { loggerContexts } = require('../constants/loggerContexts');
const { logger } = require('../utils');
const BaseController = require('../utils/BaseController');
const { ResponseMessage } = require('../utils/ResponseMessage');

const categoryServices = new CategoryServices();

class CategoryController extends BaseController {
  constructor(categoryRepository) {
    super();
    this.categoryRepository = categoryRepository;
  }

  async getAllCategories(req, res, next) {
    try {
      logger.info({
        message: 'Start executing method',
        context: loggerContexts.getAllCategories,
      });

      const responseObj = new ResponseMessage();

      const categories = await categoryServices.getAllCategories(req);

      if (categories) {
        responseObj.data = categories;
        responseObj.httpStatusCode = 200;
        responseObj.message = 'Fetched all categories successfully';

        super.createResponse.success(res, responseObj);
      }
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
      const responseObj = new ResponseMessage();

      const category = await categoryServices.getCategory(req.params.id);

      if (!category) {
        responseObj.httpStatusCode = 404;
        responseObj.message = 'Category not found';
      } else {
        responseObj.data = category;
        responseObj.httpStatusCode = 200;
        responseObj.message = 'Fetched category successfully';
      }

      super.createResponse.success(res, responseObj);
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
      const responseObj = new ResponseMessage();
      responseObj.data = newCategory;
      responseObj.httpStatusCode = 201;
      responseObj.message = 'Category created successfully';
      super.createResponse.success(res, responseObj);
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
      const responseObj = new ResponseMessage();
      responseObj.data = updatedCategory || {};
      responseObj.httpStatusCode = updatedCategory ? 200 : 404;
      responseObj.message = updatedCategory
        ? 'Category updated successfully'
        : 'Category not found';
      super.createResponse.success(res, responseObj);
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
      const responseObj = new ResponseMessage();
      responseObj.data = deletedCategory || {};
      responseObj.httpStatusCode = deletedCategory ? 200 : 404;
      responseObj.message = deletedCategory
        ? 'Category deleted successfully'
        : 'Category not found';
      super.createResponse.success(res, responseObj);
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
