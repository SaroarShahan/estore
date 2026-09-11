const { startServer, stopServer } = require('./server');

startServer();

if (process.env.IS_LOCAL !== 'true') {
  process.on('SIGTERM', stopServer);
}

process.on('uncaughtException', (err) => {
  console.error({
    message: 'Uncaught Exception',
    context: 'process',
    data: {
      error: err.message,
      stack: err.stack,
    },
  });
});

process.on('unhandledRejection', (reason, promise) => {
  console.error({
    message: 'Unhandled Rejection',
    context: 'process',
    data: {
      promise,
      reason,
    },
  });
});
