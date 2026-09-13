const { CustomerServices } = require('../services/CustomerServices');
const { loggerContexts } = require('../constants/loggerContexts');
const { logger } = require('../utils');
const BaseController = require('../utils/BaseController');
const { ResponseMessage } = require('../utils/ResponseMessage');

const customerServices = new CustomerServices();

class CustomerController extends BaseController {
  constructor(customerRepository) {
    super();
    this.customerRepository = customerRepository;
  }

  async getAllCustomers(req, res, next) {
    try {
      logger.info({
        message: 'Start executing method',
        context: loggerContexts.getAllCustomers,
      });

      const customers = await customerServices.getAllCustomers(req);
      const responseObj = new ResponseMessage();
      if (customers) {
        responseObj.data = customers;
        responseObj.httpStatusCode = 200;
        responseObj.message = 'Fetched all customers successfully';
      }
      super.createResponse.success(res, responseObj);
    } catch (error) {
      logger.error({
        error,
        context: loggerContexts.getAllCustomers,
      });
      next(error);
    }
  }

  async getCustomer(req, res, next) {
    try {
      logger.info({
        message: 'Start executing method',
        context: loggerContexts.getCustomer,
      });

      const customer = await customerServices.getCustomer(req.params.id);
      const responseObj = new ResponseMessage();
      responseObj.data = customer || {};
      responseObj.httpStatusCode = customer ? 200 : 404;
      responseObj.message = customer ? 'Fetched customer successfully' : 'Customer not found';
      super.createResponse.success(res, responseObj);
    } catch (error) {
      logger.error({
        error,
        context: loggerContexts.getCustomer,
      });
      next(error);
    }
  }

  async createCustomer(req, res, next) {
    try {
      logger.info({
        message: 'Start executing method',
        context: loggerContexts.createCustomer,
      });
      logger.info({
        message: 'Create Customer Req Body',
        context: loggerContexts.createCustomer,
        data: req.body,
      });

      const newCustomer = await customerServices.createCustomer(req.body);
      const responseObj = new ResponseMessage();
      responseObj.data = newCustomer;
      responseObj.httpStatusCode = 201;
      responseObj.message = 'Customer created successfully';
      super.createResponse.success(res, responseObj);
    } catch (error) {
      logger.error({
        error,
        context: loggerContexts.createCustomer,
      });
      next(error);
    }
  }

  async updateCustomer(req, res, next) {
    try {
      logger.info({
        message: 'Start executing method',
        context: loggerContexts.updateCustomer,
      });
      logger.info({
        message: 'Update Customer Req Body',
        context: loggerContexts.updateCustomer,
        data: req.body,
      });

      const updatedCustomer = await customerServices.updateCustomer(req.params.id, req.body);
      const responseObj = new ResponseMessage();
      responseObj.data = updatedCustomer || {};
      responseObj.httpStatusCode = updatedCustomer ? 200 : 404;
      responseObj.message = updatedCustomer
        ? 'Customer updated successfully'
        : 'Customer not found';
      super.createResponse.success(res, responseObj);
    } catch (error) {
      logger.error({
        error,
        context: loggerContexts.updateCustomer,
      });
      next(error);
    }
  }

  async deleteCustomer(req, res, next) {
    try {
      logger.info({
        message: 'Start executing method',
        context: loggerContexts.deleteCustomer,
      });

      const deletedCustomer = await customerServices.deleteCustomer(req.params.id);
      const responseObj = new ResponseMessage();
      responseObj.data = deletedCustomer || {};
      responseObj.httpStatusCode = deletedCustomer ? 200 : 404;
      responseObj.message = deletedCustomer
        ? 'Customer deleted successfully'
        : 'Customer not found';
      super.createResponse.success(res, responseObj);
    } catch (error) {
      logger.error({
        error,
        context: loggerContexts.deleteCustomer,
      });
      next(error);
    }
  }
}

module.exports = { CustomerController };
