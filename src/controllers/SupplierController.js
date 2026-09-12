const { SupplierServices } = require('../services/SupplierServices');
const { loggerContexts } = require('../constants/loggerContexts');
const { logger } = require('../utils');

const supplierServices = new SupplierServices();

class SupplierController {
  constructor(supplierRepository) {
    this.supplierRepository = supplierRepository;
  }

  async getAllSuppliers(req, res, next) {
    try {
      logger.info({
        message: 'Start executing method',
        context: loggerContexts.getAllSuppliers,
      });

      const suppliers = await supplierServices.getAllSuppliers(req);

      res.status(200).json({
        status: true,
        message: 'Fetched all suppliers successfully',
        data: suppliers,
      });
    } catch (error) {
      logger.error({
        error,
        context: loggerContexts.getAllSuppliers,
      });
      next(error);
    }
  }

  async getSupplier(req, res, next) {
    try {
      logger.info({
        message: 'Start executing method',
        context: loggerContexts.getSupplier,
      });

      const supplier = await supplierServices.getSupplier(req.params.id);

      if (!supplier) {
        return res.status(404).json({ message: 'Supplier not found' });
      }

      res.status(200).json({
        status: true,
        message: 'Fetched supplier successfully',
        supplier: supplier,
      });
    } catch (error) {
      logger.error({
        error,
        context: loggerContexts.getSupplier,
      });
      next(error);
    }
  }

  async createSupplier(req, res, next) {
    try {
      logger.info({
        message: 'Start executing method',
        context: loggerContexts.createSupplier,
      });
      logger.info({
        message: 'Create Supplier Req Body',
        context: loggerContexts.createSupplier,
        data: req.body,
      });

      const newSupplier = await supplierServices.createSupplier(req.body);

      res.status(201).json({
        status: true,
        message: 'Supplier created successfully',
        supplier: newSupplier,
      });
    } catch (error) {
      logger.error({
        error,
        context: loggerContexts.createSupplier,
      });
      next(error);
    }
  }

  async updateSupplier(req, res, next) {
    try {
      logger.info({
        message: 'Start executing method',
        context: loggerContexts.updateSupplier,
      });
      logger.info({
        message: 'Update Supplier Req Body',
        context: loggerContexts.updateSupplier,
        data: req.body,
      });

      const updatedSupplier = await supplierServices.updateSupplier(req.params.id, req.body);

      if (!updatedSupplier) {
        return res.status(404).json({ message: 'Supplier not found' });
      }

      res.status(200).json({
        status: true,
        message: 'Supplier updated successfully',
        supplier: updatedSupplier,
      });
    } catch (error) {
      logger.error({
        error,
        context: loggerContexts.updateSupplier,
      });
      next(error);
    }
  }

  async deleteSupplier(req, res, next) {
    try {
      logger.info({
        message: 'Start executing method',
        context: loggerContexts.deleteSupplier,
      });

      const deletedSupplier = await supplierServices.deleteSupplier(req.params.id);

      if (!deletedSupplier) {
        return res.status(404).json({ message: 'Supplier not found' });
      }

      res.status(200).json({
        status: true,
        message: 'Supplier deleted successfully',
      });
    } catch (error) {
      logger.error({
        error,
        context: loggerContexts.deleteSupplier,
      });
      next(error);
    }
  }
}

module.exports = { SupplierController };
