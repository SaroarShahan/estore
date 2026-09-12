const express = require('express');

const { ProductController } = require('../controllers/ProductController');

class ProductRoutes {
  static configureRoutes() {
    const router = express.Router();
    const productController = new ProductController();

    router.route('/').get(productController.getAllProducts).post(productController.createProduct);

    router
      .route('/:id')
      .get(productController.getProduct)
      .patch(productController.updateProduct)
      .delete(productController.deleteProduct);

    return router;
  }
}

module.exports = { ProductRoutes };
