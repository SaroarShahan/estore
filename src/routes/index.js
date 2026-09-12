const express = require('express');

const { CategoryRoutes } = require('./CategoryRoutes');
const { ProductRoutes } = require('./ProductRoutes');
const { SupplierRoutes } = require('./SupplierRoutes');
const { UserRoutes } = require('./UserRoutes');

class RouteBinder {
  static bindRoutes() {
    const router = express.Router();

    router.use('/categories', CategoryRoutes.configureRoutes());
    router.use('/products', ProductRoutes.configureRoutes());
    router.use('/suppliers', SupplierRoutes.configureRoutes());
    router.use('/users', UserRoutes.configureRoutes());

    return router;
  }
}

module.exports = { RouteBinder };
