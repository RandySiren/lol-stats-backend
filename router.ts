const express = require('express');
const path = require('path');
import { StatusCodes } from 'http-status-codes';
import ApiError from './errors/api-error';
import Logger from './logging/logger';

const logger = Logger.getLogger(path.basename(__filename));

var router = express.Router();

// Middleware that is specific to this router, we'll just log the time of call
router.use(function timeLog(req, res, next) {
    logger.info('Time: ' + Date.now());
    next();
});

router.get('/getRecentMatches', async (req, res, next) => {
    const summoner = req.query.summoner || undefined;
    if (!summoner) {
        const error = new ApiError('Bad summoner params');
        res.status(error.statusCode).send(error.serialize());
    } else {
        res.send('ok');
    }
});

module.exports = router;
