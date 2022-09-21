function errorLoggerHandler(err, req, res, next){
    console.log(err.stack);
    next(err);
}

export default errorLoggerHandler;