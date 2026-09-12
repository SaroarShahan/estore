const dotenv = require('dotenv');
const http = require('http');

const { App } = require('./app');
const sequelize = require('./config/db');
const { loggerContexts } = require('./constants/loggerContexts');
const { logger } = require('./utils');

dotenv.config();

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || 'localhost';

const application = new App().init();
const server = http.createServer(application);

const listen = () => {
  server.listen(PORT, () => {
    logger.info({
      message: 'Estore API is running',
      context: loggerContexts.listen,
      data: {
        ip: HOST,
        port: PORT,
        processId: process.pid,
      },
    });
  });
};

const stopServer = () => {
  logger.info({
    message: 'Stopping server',
    context: loggerContexts.stopServer,
  });

  server.close(() => {
    logger.info({
      message: 'Estore API is stopped',
      context: loggerContexts.stopServer,
      data: {
        ip: HOST,
        port: PORT,
      },
    });
  });
};

const startServer = () => {
  logger.info({
    message: 'Starting DB server',
    context: loggerContexts.startServer,
  });

  sequelize
    .authenticate()
    .then(() => {
      logger.info({
        message: 'Database connected',
        context: loggerContexts.startServer,
      });
      listen();
    })
    .catch((error) => {
      logger.error({
        error,
        context: loggerContexts.startServer,
      });
      process.exit(1);
    });
};

module.exports = { startServer, stopServer };
