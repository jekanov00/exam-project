const cors = require('cors');
const express = require('express');

const router = require('./router');
const errorHandlers = require('./handlerError/handler');
const { logger } = require('./utils/logger');

function createApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use('/public', express.static('public'));

  app.use(logger);

  app.use('/api', router);

  app.use(
    errorHandlers.errorLogger,
    errorHandlers.yupErrorHandler,
    errorHandlers.sequelizeErrorHandler,
    errorHandlers.httpErrorHandler,
    errorHandlers.errorHandler,
  );
  return app;
}

exports.createApp = createApp;

exports.app = createApp();
