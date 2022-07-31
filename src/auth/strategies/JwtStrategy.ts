import passport from 'passport';
import passportJWT from 'passport-jwt';
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

import {UserRepository} from "../../repository/user.repository.js";

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : process.env.JWT_SECRET
}, function (jwtPayload, cb) {
    // @ts-ignore
    return UserRepository.findOne({
        where: {
            id: jwtPayload.id
        }
    })
        .then(user => {
            return cb(null, user);
        })
        .catch(err => {
            return cb(err);
        });
}));