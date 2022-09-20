import {ForbiddenException} from '../utils/errors/index.js';

const userGuard = (options) => async (req, res, next) => {
    const {
        isVerified = true,
        isEnabled = true,
        ignorePermissions = false
    } = {...options};

    if (req.user) {
        if(!ignorePermissions && !req.user.permissions.includes(req.method)){
            const error = new ForbiddenException('You don\'t have permission to do this.');
            return next(error);
        }
        if(isVerified && req.user.isVerified === 0) {
            const error = new ForbiddenException('You must activate your account before doing this.');
            return next(error);
        }
        if(isEnabled && req.user.isEnabled === 0) {
            const error = new ForbiddenException('You\'re not allowed to do this because your account has been disabled.');
            return next(error);
        }
        next();
    } else {
        const error = new ForbiddenException('You must first login to view this.');
        error.statusCode = 403;
        return next(error);
    }
};

export default userGuard;