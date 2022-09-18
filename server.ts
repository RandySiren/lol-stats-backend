import Logger from './logging/logger';
const cors = require('cors');
const express = require('express');
const config = require('./conf/config');
const path = require('path');
require('express-async-errors');

const logger = Logger.getLogger(path.basename(__filename));
const router = require('./router');

logger.info('Starting server with config - ' + JSON.stringify(config));

const app = express();
app.use(cors());
app.use(express.json());

// TODO: Setup error handler middleware!!!

app.get('/liveness', (req, res) => res.status(200).send({ status: 'ok' }));

app.use('/api/v1/', router);

const server = app.listen(config.httpPort, function () {
    logger.info(`Listening on ${config.httpPort}`);
});

async function shutdown(): Promise<number> {
    await server.close();
    logger.info('Shutdown complete');
    return 0;
}

process.on('SIGTERM', async () => {
    logger.info('SIGTERM signal received.');
    let retCode: number = await shutdown();
    process.exit(retCode);
});

process.on('SIGINT', async () => {
    logger.info('SIGINT signal received.');
    let retCode: number = await shutdown();
    process.exit(retCode);
});
