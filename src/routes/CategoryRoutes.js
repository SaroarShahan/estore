const express = require('express');

const { CategoryController } = require('../controllers/CategoryController');

class CategoryRoutes {
  static configureRoutes() {
    const router = express.Router();
    const categoryController = new CategoryController();

    router.route('/').get(categoryController.getAllCategories).post(categoryController.createCategory);

    router
      .route('/:id')
      .get(categoryController.getCategory)
      .patch(categoryController.updateCategory)
      .delete(categoryController.deleteCategory);

    return router;
  }
}

module.exports = { CategoryRoutes };
