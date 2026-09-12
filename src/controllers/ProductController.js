const { ProductServices } = require('../services/ProductServices');
const { loggerContexts } = require('../constants/loggerContexts');
const { logger } = require('../utils');

const productServices = new ProductServices();

class ProductController {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async getAllProducts(req, res, next) {
    try {
      logger.info({
        message: 'Start executing method',
        context: loggerContexts.getAllProducts,
      });

      const products = await productServices.getAllProducts(req);

      res.status(200).json({
        status: true,
        message: 'Fetched all products successfully',
        data: products,
      });
    } catch (error) {
      logger.error({
        error,
        context: loggerContexts.getAllProducts,
      });
      next(error);
    }
  }

  async getProduct(req, res, next) {
    try {
      logger.info({
        message: 'Start executing method',
        context: loggerContexts.getProduct,
      });

      const product = await productServices.getProduct(req.params.id);

      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      res.status(200).json({
        status: true,
        message: 'Fetched product successfully',
        product: product,
      });
    } catch (error) {
      logger.error({
        error,
        context: loggerContexts.getProduct,
      });
      next(error);
    }
  }

  async createProduct(req, res, next) {
    try {
      logger.info({
        message: 'Start executing method',
        context: loggerContexts.createProduct,
      });
      logger.info({
        message: 'Create Product Req Body',
        context: loggerContexts.createProduct,
        data: req.body,
      });

      const newProduct = await productServices.createProduct(req.body);

      res.status(201).json({
        status: true,
        message: 'Product created successfully',
        product: newProduct,
      });
    } catch (error) {
      logger.error({
        error,
        context: loggerContexts.createProduct,
      });
      next(error);
    }
  }

  async updateProduct(req, res, next) {
    try {
      logger.info({
        message: 'Start executing method',
        context: loggerContexts.updateProduct,
      });
      logger.info({
        message: 'Update Product Req Body',
        context: loggerContexts.updateProduct,
        data: req.body,
      });

      const updatedProduct = await productServices.updateProduct(req.params.id, req.body);

      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }

      res.status(200).json({
        status: true,
        message: 'Product updated successfully',
        product: updatedProduct,
      });
    } catch (error) {
      logger.error({
        error,
        context: loggerContexts.updateProduct,
      });
      next(error);
    }
  }

  async deleteProduct(req, res, next) {
    try {
      logger.info({
        message: 'Start executing method',
        context: loggerContexts.deleteProduct,
      });

      const deletedProduct = await productServices.deleteProduct(req.params.id);

      if (!deletedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }

      res.status(200).json({
        status: true,
        message: 'Product deleted successfully',
      });
    } catch (error) {
      logger.error({
        error,
        context: loggerContexts.deleteProduct,
      });
      next(error);
    }
  }
}

module.exports = { ProductController };
