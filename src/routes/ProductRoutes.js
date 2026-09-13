const express = require('express');

const { ProductController } = require('../controllers/ProductController');
const { authenticateToken, optionalAuthenticateToken } = require('../middlewares/auth');
const { hasPermission } = require('../middlewares/authorize');
const validate = require('../middlewares/validate');
const {
  createProductSchema,
  deleteProductSchema,
  getProductSchema,
  getProductsSchema,
  updateProductSchema,
} = require('../validations/productValidation');

class ProductRoutes {
  static configureRoutes() {
    const router = express.Router();
    const productController = new ProductController();

    router
      .route('/')
      .get(
        [optionalAuthenticateToken, validate(getProductsSchema)],
        productController.getAllProducts,
      )
      .post(
        [authenticateToken, hasPermission('products.create'), validate(createProductSchema)],
        productController.createProduct,
      );

    router
      .route('/:id')
      .get([optionalAuthenticateToken, validate(getProductSchema)], productController.getProduct)
      .patch(
        [authenticateToken, hasPermission('products.update'), validate(updateProductSchema)],
        productController.updateProduct,
      )
      .delete(
        [authenticateToken, hasPermission('products.delete'), validate(deleteProductSchema)],
        productController.deleteProduct,
      );

    return router;
  }
}

module.exports = { ProductRoutes };
