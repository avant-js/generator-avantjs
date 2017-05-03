const Hapi = require('hapi');
const config = require('./config');
const routes = require('./routes');
const server = require('./server');
const mongoose = require('mongoose');

// Initialize mongo db connection
mongoose.Promise = global.Promise;
mongoose.connect(config.database.url);

// Create Hapi server
const server = new Hapi.Server();
server.connection({
  port: config.server.port,
  host: config.server.host,
  router: {
    stripTrailingSlash: true
  }
});

// Import routes
server.route(routes);

// Start Hapi server if not being imported
if (!module.parent) {
  server.start((err) => {
    if (err) throw err;
    console.log(`Server running at: ${server.info.uri}`);
  });
}

module.exports = server;