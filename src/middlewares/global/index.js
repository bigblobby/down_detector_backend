// const catchAsync = ((fn) => (req, res, next) => {
//     Promise.resolve(fn(req, res, next)).catch((err) => next(err));
// });

const catchAsync = ((fn) => async (req, res, next) => {
    try {
        await fn(req, res, next);
    } catch (err) {
        next(err);
    }
});

export default {
    catchAsync
};

