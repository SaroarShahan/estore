const { CustomerServices } = require('../services/CustomerServices');
const { loggerContexts } = require('../constants/loggerContexts');
const { logger } = require('../utils');
const BaseController = require('../utils/BaseController');

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

      res.status(200).json({
        status: true,
        message: 'Fetched all customers successfully',
        data: customers,
      });
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

      if (!customer) {
        return res.status(404).json({ message: 'Customer not found' });
      }

      res.status(200).json({
        status: true,
        message: 'Fetched customer successfully',
        customer,
      });
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

      res.status(201).json({
        status: true,
        message: 'Customer created successfully',
        customer: newCustomer,
      });
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

      if (!updatedCustomer) {
        return res.status(404).json({ message: 'Customer not found' });
      }

      res.status(200).json({
        status: true,
        message: 'Customer updated successfully',
        customer: updatedCustomer,
      });
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

      if (!deletedCustomer) {
        return res.status(404).json({ message: 'Customer not found' });
      }

      res.status(200).json({
        status: true,
        message: 'Customer deleted successfully',
      });
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
