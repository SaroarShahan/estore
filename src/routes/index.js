const express = require('express');

const { UserRoutes } = require('./UserRoutes');

class RouteBinder {
  static bindRoutes() {
    const router = express.Router();

    router.use('/users', UserRoutes.configureRoutes());

    return router;
  }
}

module.exports = { RouteBinder };
