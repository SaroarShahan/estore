const express = require('express');

const { OrderController } = require('../controllers/OrderController');

class OrderRoutes {
  static configureRoutes() {
    const router = express.Router();
    const orderController = new OrderController();

    router.route('/').get(orderController.getAllOrders).post(orderController.createOrder);

    router
      .route('/:id')
      .get(orderController.getOrder)
      .patch(orderController.updateOrder)
      .delete(orderController.deleteOrder);

    return router;
  }
}

module.exports = { OrderRoutes };
