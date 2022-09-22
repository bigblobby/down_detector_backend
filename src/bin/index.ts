import http from 'http';
import https from 'https';
import 'reflect-metadata';
import config from '../config/appconfig.js';
import app from '../server/index.js';
import {sequelize} from '../db/sequelize.js';
import logger from '../utils/logger.js';

async function startServer(): Promise<void> {
    await sequelize.sync({force: true});

    try {
        http.createServer(app).listen(config.app.port);
        https.createServer({}, app).listen(443);
        logger.info(`Server started on port ${config.app.port}`);
    } catch(e) {
        console.error(e);
    }
}

startServer();