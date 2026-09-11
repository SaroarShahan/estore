const dotenv = require('dotenv');
const http = require('http');

const { App } = require('./app');
const sequelize = require('./config/db');

dotenv.config();

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || 'localhost';

const application = new App().init();
const server = http.createServer(application);

const listen = () => {
  server.listen(PORT, () => {
    console.info({
      message: 'Estore API is running',
      context: listen.name,
      data: {
        ip: HOST,
        port: PORT,
        processId: process.pid,
      },
    });
  });
};

const stopServer = () => {
  console.info({
    message: 'Stopping server',
    context: stopServer.name,
  });

  server.close(() => {
    console.info({
      message: 'Estore API is stopped',
      context: stopServer.name,
      data: {
        ip: HOST,
        port: PORT,
      },
    });
  });
};

const startServer = () => {
  console.info({
    message: 'Starting DB server',
    context: startServer.name,
  });

  sequelize
    .authenticate()
    .then(() => {
      console.info({
        message: 'Database connected',
        context: startServer.name,
      });
      listen();
    })
    .catch((error) => {
      console.error({
        error,
        context: startServer.name,
      });
      process.exit(1);
    });
};

module.exports = { startServer, stopServer };
