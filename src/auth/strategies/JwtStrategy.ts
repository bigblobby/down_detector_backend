import passport from 'passport';
import passportJWT from 'passport-jwt';
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

import UserModel from "../../models/UserModel.js";

function cookieExtractor(req) {
    let token = null;
    if (req && req.cookies) {
        token = req.signedCookies.access_token;
    }
    return token;
}

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor, ExtractJWT.fromAuthHeaderAsBearerToken()]),
    secretOrKey   : process.env.JWT_SECRET
}, function (jwtPayload, cb) {
    const User = new UserModel();
    // @ts-ignore
    return User.findById(jwtPayload.id)
        .then(user => {
            return cb(null, user);
        })
        .catch(err => {
            return cb(err);
        });
}));