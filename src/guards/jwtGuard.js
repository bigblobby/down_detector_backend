import {User} from '../models/User.js';
import {BadRequestException, UnauthorizedException} from '../utils/errors/index.js';
import jwtService from '../services/jwt/index.js';

const jwtGuard = async(req, res, next) => {
    try {
        let access_token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            access_token = req.headers.authorization.split(' ')[1];
        } else if (req.cookies.access_token) {
            access_token = req.cookies.access_token;
        }

        if(!access_token) return next(new UnauthorizedException('You must be logged in.'));
        const decoded = await jwtService.verifyAccessToken(access_token);
        if(!decoded) return next(new BadRequestException('Invalid token or user doesn\'t exist'));

        const user = await User.findOne({where: {id: decoded.id}});
        if(!user) return next(new BadRequestException('User does not exist.'));

        req.user = user;
        next();
    } catch(err){
        next(err);
    }
};

export default jwtGuard;
