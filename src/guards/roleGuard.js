import {ForbiddenException} from '../utils/errors/index.js';

const roleGuard = (options) => async (req, res, next) => {
    const {
        check = 'USER'
    } = {...options};

    if(req.user){
        const roles = req.user.roles.split('|');

        if(roles.includes(check)){
            next();
        } else {
            const error = new ForbiddenException('You do not have the authorisation to do this.');
            error.statusCode = 403;
            return next(error);
        }
    } else {
        const error = new ForbiddenException('You must first login to view this.');
        error.statusCode = 403;
        return next(error);
    }
}

export default roleGuard;