import logger from '../../../utils/logger.js'

function errorLoggerHandler(err, req, res, next){
    logger.error(err.stack);
    next(err);
}

export default errorLoggerHandler;