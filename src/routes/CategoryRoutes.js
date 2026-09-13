const express = require('express');

const { CategoryController } = require('../controllers/CategoryController');
const { authenticateToken, optionalAuthenticateToken } = require('../middlewares/auth');
const { hasPermission } = require('../middlewares/authorize');
const validate = require('../middlewares/validate');
const {
  createCategorySchema,
  deleteCategorySchema,
  getCategoriesSchema,
  getCategorySchema,
  updateCategorySchema,
} = require('../validations/categoryValidation');

class CategoryRoutes {
  static configureRoutes() {
    const router = express.Router();
    const categoryController = new CategoryController();

    router
      .route('/')
      .get(
        [optionalAuthenticateToken, validate(getCategoriesSchema)],
        categoryController.getAllCategories,
      )
      .post(
        [authenticateToken, hasPermission('categories.create'), validate(createCategorySchema)],
        categoryController.createCategory,
      );

    router
      .route('/:id')
      .get([optionalAuthenticateToken, validate(getCategorySchema)], categoryController.getCategory)
      .patch(
        [authenticateToken, hasPermission('categories.update'), validate(updateCategorySchema)],
        categoryController.updateCategory,
      )
      .delete(
        [authenticateToken, hasPermission('categories.delete'), validate(deleteCategorySchema)],
        categoryController.deleteCategory,
      );

    return router;
  }
}

module.exports = { CategoryRoutes };
