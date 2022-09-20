import {ForbiddenException} from '../utils/errors/index.js';
import permissionMapper from '../validators/permissionMapper.js';

const userGuard = (options) => async (req, res, next) => {
    const {
        isVerified = true,
        isEnabled = true,
        ignorePermissions = false,
        ignoreActionPermissions = true,
    } = {...options};

    if (req.user) {
        // TODO may want to change 'ignoreActionPermissions' to false before going into production
        if(!ignoreActionPermissions){
            const mapperKeys = Object.keys(permissionMapper);
            const matches = mapperKeys.map(key => {
                const action = permissionMapper[key];
                const [method, url] = key.split('|');
                if(url === req.baseUrl + req.route.path && method === req.method){
                    return req.user.allowedActions.includes(action);
                }
                return false;
            })

            if(!matches.some(Boolean)){
                const error = new ForbiddenException('You don\'t have permission to do this.');
                return next(error);
            }
        }
        if (!ignorePermissions && !req.user.permissions.includes(req.method)) {
            const error = new ForbiddenException('You don\'t have permission to do this.');
            return next(error);
        }
        if (isVerified && req.user.isVerified === 0) {
            const error = new ForbiddenException('You must activate your account before doing this.');
            return next(error);
        }
        if (isEnabled && req.user.isEnabled === 0) {
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