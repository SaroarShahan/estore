const { OrderServices } = require('../services/OrderServices');
const { loggerContexts } = require('../constants/loggerContexts');
const { logger } = require('../utils');
const BaseController = require('../utils/BaseController');
const { ResponseMessage } = require('../utils/ResponseMessage');

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
      const responseObj = new ResponseMessage();
      if (orders) {
        responseObj.data = orders;
        responseObj.httpStatusCode = 200;
        responseObj.message = 'Fetched all orders successfully';
      }
      super.createResponse.success(res, responseObj);
    } catch (error) {
      logger.error({ error, context: loggerContexts.getAllOrders });
      next(error);
    }
  }

  async getOrder(req, res, next) {
    try {
      logger.info({ message: 'Start executing method', context: loggerContexts.getOrder });

      const order = await orderServices.getOrder(req.params.id);
      const responseObj = new ResponseMessage();
      responseObj.data = order || {};
      responseObj.httpStatusCode = order ? 200 : 404;
      responseObj.message = order ? 'Fetched order successfully' : 'Order not found';
      super.createResponse.success(res, responseObj);
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
      const responseObj = new ResponseMessage();
      responseObj.data = newOrder;
      responseObj.httpStatusCode = 201;
      responseObj.message = 'Order created successfully';
      super.createResponse.success(res, responseObj);
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
      const responseObj = new ResponseMessage();
      responseObj.data = updatedOrder || {};
      responseObj.httpStatusCode = updatedOrder ? 200 : 404;
      responseObj.message = updatedOrder ? 'Order updated successfully' : 'Order not found';
      super.createResponse.success(res, responseObj);
    } catch (error) {
      logger.error({ error, context: loggerContexts.updateOrder });
      next(error);
    }
  }

  async deleteOrder(req, res, next) {
    try {
      logger.info({ message: 'Start executing method', context: loggerContexts.deleteOrder });

      const deletedOrder = await orderServices.deleteOrder(req.params.id);
      const responseObj = new ResponseMessage();
      responseObj.data = deletedOrder || {};
      responseObj.httpStatusCode = deletedOrder ? 200 : 404;
      responseObj.message = deletedOrder ? 'Order deleted successfully' : 'Order not found';
      super.createResponse.success(res, responseObj);
    } catch (error) {
      logger.error({ error, context: loggerContexts.deleteOrder });
      next(error);
    }
  }
}

module.exports = { OrderController };
