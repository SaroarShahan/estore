const express = require('express');

const { AuthRoutes } = require('./AuthRoutes');
const { CategoryRoutes } = require('./CategoryRoutes');
const { CustomerRoutes } = require('./CustomerRoutes');
const { OrderRoutes } = require('./OrderRoutes');
const { PermissionRoutes } = require('./PermissionRoutes');
const { ProductRoutes } = require('./ProductRoutes');
const { RoleRoutes } = require('./RoleRoutes');
const { SupplierRoutes } = require('./SupplierRoutes');
const { UserRoutes } = require('./UserRoutes');

class RouteBinder {
  static bindRoutes() {
    const router = express.Router();

    router.use('/auth', AuthRoutes.configureRoutes());
    router.use('/categories', CategoryRoutes.configureRoutes());
    router.use('/customers', CustomerRoutes.configureRoutes());
    router.use('/orders', OrderRoutes.configureRoutes());
    router.use('/permissions', PermissionRoutes.configureRoutes());
    router.use('/products', ProductRoutes.configureRoutes());
    router.use('/roles', RoleRoutes.configureRoutes());
    router.use('/suppliers', SupplierRoutes.configureRoutes());
    router.use('/users', UserRoutes.configureRoutes());

    return router;
  }
}

module.exports = { RouteBinder };
