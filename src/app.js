const express = require('express');

const { RouteBinder } = require('./routes');

const apiBaseUri = '/api/v1';

class App {
  initRoutes(app) {
    app.use(apiBaseUri, RouteBinder.bindRoutes());
  }

  initMiddleware(app) {
    app.use(express.json());
  }

  initHealthCheck(app) {
    app.get('/health', (req, res) => {
      res.json({
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now(),
      });
    });
  }

  initGlobalVariable() {
    global.isProduction = process.env.NODE_ENV;
  }

  init() {
    const app = express();

    this.initMiddleware(app);
    this.initGlobalVariable();
    this.initRoutes(app);
    this.initHealthCheck(app);
    app.disable('x-powered-by');

    return app;
  }
}

function createApp() {
  return new App().init();
}

module.exports = { App, createApp };
