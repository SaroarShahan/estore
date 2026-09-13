const { SupplierServices } = require('../services/SupplierServices');
const { loggerContexts } = require('../constants/loggerContexts');
const { logger } = require('../utils');
const BaseController = require('../utils/BaseController');
const { ResponseMessage } = require('../utils/ResponseMessage');

const supplierServices = new SupplierServices();

class SupplierController extends BaseController {
  constructor(supplierRepository) {
    super();
    this.supplierRepository = supplierRepository;
  }

  async getAllSuppliers(req, res, next) {
    try {
      logger.info({
        message: 'Start executing method',
        context: loggerContexts.getAllSuppliers,
      });

      const suppliers = await supplierServices.getAllSuppliers(req);
      const responseObj = new ResponseMessage();
      if (suppliers) {
        responseObj.data = suppliers;
        responseObj.httpStatusCode = 200;
        responseObj.message = 'Fetched all suppliers successfully';
      }
      super.createResponse.success(res, responseObj);
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
      const responseObj = new ResponseMessage();
      responseObj.data = supplier || {};
      responseObj.httpStatusCode = supplier ? 200 : 404;
      responseObj.message = supplier ? 'Fetched supplier successfully' : 'Supplier not found';
      super.createResponse.success(res, responseObj);
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
      const responseObj = new ResponseMessage();
      responseObj.data = newSupplier;
      responseObj.httpStatusCode = 201;
      responseObj.message = 'Supplier created successfully';
      super.createResponse.success(res, responseObj);
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
      const responseObj = new ResponseMessage();
      responseObj.data = updatedSupplier || {};
      responseObj.httpStatusCode = updatedSupplier ? 200 : 404;
      responseObj.message = updatedSupplier
        ? 'Supplier updated successfully'
        : 'Supplier not found';
      super.createResponse.success(res, responseObj);
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
      const responseObj = new ResponseMessage();
      responseObj.data = deletedSupplier || {};
      responseObj.httpStatusCode = deletedSupplier ? 200 : 404;
      responseObj.message = deletedSupplier
        ? 'Supplier deleted successfully'
        : 'Supplier not found';
      super.createResponse.success(res, responseObj);
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
