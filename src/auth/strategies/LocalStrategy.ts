import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import authService from '../../services/auth/index.js';

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    async function (email, password, cb) {
        try {
            const user = await authService.login(email, password);
            // if(!user) return cb(null, false, {message: 'Incorrect email or password.'});
            return cb(null, user, {message: 'Logged In Successfully'});
        } catch (error) {
            cb(error);
        }
    }
));