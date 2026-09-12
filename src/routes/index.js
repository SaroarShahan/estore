const express = require('express');

const { CategoryRoutes } = require('./CategoryRoutes');
const { CustomerRoutes } = require('./CustomerRoutes');
const { OrderRoutes } = require('./OrderRoutes');
const { ProductRoutes } = require('./ProductRoutes');
const { SupplierRoutes } = require('./SupplierRoutes');
const { UserRoutes } = require('./UserRoutes');

class RouteBinder {
  static bindRoutes() {
    const router = express.Router();

    router.use('/categories', CategoryRoutes.configureRoutes());
    router.use('/customers', CustomerRoutes.configureRoutes());
    router.use('/orders', OrderRoutes.configureRoutes());
    router.use('/products', ProductRoutes.configureRoutes());
    router.use('/suppliers', SupplierRoutes.configureRoutes());
    router.use('/users', UserRoutes.configureRoutes());

    return router;
  }
}

module.exports = { RouteBinder };
