var config = JSON.parse('{}');

config.httpPort = process.env.HTTP_PORT || 5000;
config.environment = process.env.NODE_ENV || 'dev';
config.logLevel = process.env.LOG_LEVEL || 'debug';

module.exports = config;
