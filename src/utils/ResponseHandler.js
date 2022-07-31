
class ResponseHandler {
    constructor(logger) {
        this.logger = logger;
    }

    sendSuccess(res, status, message) {
        this.logger.info(`Success: ${status}`);

        return (data, globalData) => {
            const response = {
                status: status,
                message: message,
                data: data,
                globalData: globalData
            };

            res.status(status).json(response);
        }
    }

    sendError(res, status, message) {
        this.logger.error(`Error: ${status}`);

        return res.status(error.status || 500).json({
            type: 'error', message: error.message || error.message || 'Unhandled Error', error,
        });
    }
}