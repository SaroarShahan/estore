const { ProductServices } = require('../services/ProductServices');

const productServices = new ProductServices();

class ProductController {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async getAllProducts(req, res, next) {
    try {
      const products = await productServices.getAllProducts(req);

      res.status(200).json({
        status: true,
        message: 'Fetched all products successfully',
        data: products,
      });
    } catch (error) {
      next(error);
    }
  }

  async getProduct(req, res, next) {
    try {
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
      next(error);
    }
  }

  async createProduct(req, res, next) {
    try {
      const newProduct = await productServices.createProduct(req.body);

      res.status(201).json({
        status: true,
        message: 'Product created successfully',
        product: newProduct,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateProduct(req, res, next) {
    try {
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
      next(error);
    }
  }

  async deleteProduct(req, res, next) {
    try {
      const deletedProduct = await productServices.deleteProduct(req.params.id);

      if (!deletedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }

      res.status(200).json({
        status: true,
        message: 'Product deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { ProductController };
