const http = require('http');
const { app } = require('./app');
const controller = require('./socketInit');

require('./dbMongo/mongoose');

const server = http.createServer(app);

const port = process.env.PORT ?? 5000;

server.listen(port);
controller.createConnection(server);
