import {ForbiddenException} from '../utils/errors/index.js';

const userGuard = (options) => async (req, res, next) => {
    const {
        isActive = true,
        isEnabled = true,
    } = {...options};

    if (req.user) {
        if(isActive && req.user.isActive === 0) {
            const error = new ForbiddenException('You must activate your account before doing this.');
            return next(error);
        }
        if(isEnabled && req.user.isDisabled === 1) {
            const error = new ForbiddenException('You\'re not allowed to do this because your account has been disabled.');
            return next(error);
        }
        next();
    } else {
        const error = new Error('You must first login to view this.');
        error.statusCode = 403;
        return next(error);
    }
};

export default userGuard;