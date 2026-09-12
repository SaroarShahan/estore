const express = require('express');

const { CustomerController } = require('../controllers/CustomerController');

class CustomerRoutes {
  static configureRoutes() {
    const router = express.Router();
    const customerController = new CustomerController();

    router.route('/').get(customerController.getAllCustomers).post(customerController.createCustomer);

    router
      .route('/:id')
      .get(customerController.getCustomer)
      .patch(customerController.updateCustomer)
      .delete(customerController.deleteCustomer);

    return router;
  }
}

module.exports = { CustomerRoutes };
