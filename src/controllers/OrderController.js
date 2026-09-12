const { OrderServices } = require('../services/OrderServices');
const { loggerContexts } = require('../constants/loggerContexts');
const { logger } = require('../utils');
const BaseController = require('../utils/BaseController');

const orderServices = new OrderServices();

class OrderController extends BaseController {
  constructor(orderRepository) {
    super();
    this.orderRepository = orderRepository;
  }

  async getAllOrders(req, res, next) {
    try {
      logger.info({
        message: 'Start executing method',
        context: loggerContexts.getAllOrders,
      });

      const orders = await orderServices.getAllOrders(req);

      res.status(200).json({
        status: true,
        message: 'Fetched all orders successfully',
        data: orders,
      });
    } catch (error) {
      logger.error({ error, context: loggerContexts.getAllOrders });
      next(error);
    }
  }

  async getOrder(req, res, next) {
    try {
      logger.info({ message: 'Start executing method', context: loggerContexts.getOrder });

      const order = await orderServices.getOrder(req.params.id);

      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }

      res.status(200).json({
        status: true,
        message: 'Fetched order successfully',
        order,
      });
    } catch (error) {
      logger.error({ error, context: loggerContexts.getOrder });
      next(error);
    }
  }

  async createOrder(req, res, next) {
    try {
      logger.info({ message: 'Start executing method', context: loggerContexts.createOrder });
      logger.info({
        message: 'Create Order Req Body',
        context: loggerContexts.createOrder,
        data: req.body,
      });

      const newOrder = await orderServices.createOrder(req.body);

      res.status(201).json({
        status: true,
        message: 'Order created successfully',
        order: newOrder,
      });
    } catch (error) {
      logger.error({ error, context: loggerContexts.createOrder });
      next(error);
    }
  }

  async updateOrder(req, res, next) {
    try {
      logger.info({ message: 'Start executing method', context: loggerContexts.updateOrder });
      logger.info({
        message: 'Update Order Req Body',
        context: loggerContexts.updateOrder,
        data: req.body,
      });

      const updatedOrder = await orderServices.updateOrder(req.params.id, req.body);

      if (!updatedOrder) {
        return res.status(404).json({ message: 'Order not found' });
      }

      res.status(200).json({
        status: true,
        message: 'Order updated successfully',
        order: updatedOrder,
      });
    } catch (error) {
      logger.error({ error, context: loggerContexts.updateOrder });
      next(error);
    }
  }

  async deleteOrder(req, res, next) {
    try {
      logger.info({ message: 'Start executing method', context: loggerContexts.deleteOrder });

      const deletedOrder = await orderServices.deleteOrder(req.params.id);

      if (!deletedOrder) {
        return res.status(404).json({ message: 'Order not found' });
      }

      res.status(200).json({
        status: true,
        message: 'Order deleted successfully',
      });
    } catch (error) {
      logger.error({ error, context: loggerContexts.deleteOrder });
      next(error);
    }
  }
}

module.exports = { OrderController };
