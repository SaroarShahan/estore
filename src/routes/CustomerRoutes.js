const express = require('express');

const { CustomerController } = require('../controllers/CustomerController');
const { authenticateToken, optionalAuthenticateToken } = require('../middlewares/auth');
const { hasPermission } = require('../middlewares/authorize');
const validate = require('../middlewares/validate');
const {
  createCustomerSchema,
  deleteCustomerSchema,
  getCustomerSchema,
  getCustomersSchema,
  updateCustomerSchema,
} = require('../validations/customerValidation');

class CustomerRoutes {
  static configureRoutes() {
    const router = express.Router();
    const customerController = new CustomerController();

    router
      .route('/')
      .get(
        [optionalAuthenticateToken, validate(getCustomersSchema)],
        customerController.getAllCustomers,
      )
      .post(
        [authenticateToken, hasPermission('customers.create'), validate(createCustomerSchema)],
        customerController.createCustomer,
      );

    router
      .route('/:id')
      .get([optionalAuthenticateToken, validate(getCustomerSchema)], customerController.getCustomer)
      .patch(
        [authenticateToken, hasPermission('customers.update'), validate(updateCustomerSchema)],
        customerController.updateCustomer,
      )
      .delete(
        [authenticateToken, hasPermission('customers.delete'), validate(deleteCustomerSchema)],
        customerController.deleteCustomer,
      );

    return router;
  }
}

module.exports = { CustomerRoutes };
