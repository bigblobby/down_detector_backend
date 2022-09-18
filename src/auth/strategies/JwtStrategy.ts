import passport from 'passport';
import passportJWT from 'passport-jwt';
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
import {User} from "../../models/User.js";

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
    return User.findOne({
        where: {
            id: jwtPayload.id
        },
        raw: true
    })
        .then(user => {
            return cb(null, user);
        })
        .catch(err => {
            return cb(err);
        });
}));