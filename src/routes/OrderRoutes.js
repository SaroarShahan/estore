const express = require('express');

const { OrderController } = require('../controllers/OrderController');
const { authenticateToken, optionalAuthenticateToken } = require('../middlewares/auth');
const { hasPermission } = require('../middlewares/authorize');
const validate = require('../middlewares/validate');
const {
  createOrderSchema,
  deleteOrderSchema,
  getOrderSchema,
  getOrdersSchema,
  updateOrderSchema,
} = require('../validations/orderValidation');

class OrderRoutes {
  static configureRoutes() {
    const router = express.Router();
    const orderController = new OrderController();

    router
      .route('/')
      .get([optionalAuthenticateToken, validate(getOrdersSchema)], orderController.getAllOrders)
      .post(
        [authenticateToken, hasPermission('orders.create'), validate(createOrderSchema)],
        orderController.createOrder,
      );

    router
      .route('/:id')
      .get([optionalAuthenticateToken, validate(getOrderSchema)], orderController.getOrder)
      .patch(
        [authenticateToken, hasPermission('orders.update'), validate(updateOrderSchema)],
        orderController.updateOrder,
      )
      .delete(
        [authenticateToken, hasPermission('orders.delete'), validate(deleteOrderSchema)],
        orderController.deleteOrder,
      );

    return router;
  }
}

module.exports = { OrderRoutes };
