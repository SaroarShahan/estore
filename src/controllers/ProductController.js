const { ProductServices } = require('../services/ProductServices');
const { loggerContexts } = require('../constants/loggerContexts');
const { logger } = require('../utils');
const BaseController = require('../utils/BaseController');
const { ResponseMessage } = require('../utils/ResponseMessage');

const productServices = new ProductServices();

class ProductController extends BaseController {
  constructor(productRepository) {
    super();
    this.productRepository = productRepository;
  }

  async getAllProducts(req, res, next) {
    try {
      logger.info({
        message: 'Start executing method',
        context: loggerContexts.getAllProducts,
      });

      const products = await productServices.getAllProducts(req);
      const responseObj = new ResponseMessage();
      if (products) {
        responseObj.data = products;
        responseObj.httpStatusCode = 200;
        responseObj.message = 'Fetched all products successfully';
      }
      super.createResponse.success(res, responseObj);
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
      const responseObj = new ResponseMessage();
      responseObj.data = product || {};
      responseObj.httpStatusCode = product ? 200 : 404;
      responseObj.message = product ? 'Fetched product successfully' : 'Product not found';
      super.createResponse.success(res, responseObj);
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
      const responseObj = new ResponseMessage();
      responseObj.data = newProduct;
      responseObj.httpStatusCode = 201;
      responseObj.message = 'Product created successfully';
      super.createResponse.success(res, responseObj);
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
      const responseObj = new ResponseMessage();
      responseObj.data = updatedProduct || {};
      responseObj.httpStatusCode = updatedProduct ? 200 : 404;
      responseObj.message = updatedProduct ? 'Product updated successfully' : 'Product not found';
      super.createResponse.success(res, responseObj);
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
      const responseObj = new ResponseMessage();
      responseObj.data = deletedProduct || {};
      responseObj.httpStatusCode = deletedProduct ? 200 : 404;
      responseObj.message = deletedProduct ? 'Product deleted successfully' : 'Product not found';
      super.createResponse.success(res, responseObj);
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
