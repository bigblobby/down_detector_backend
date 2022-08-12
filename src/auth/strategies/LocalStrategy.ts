import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

// import {UserRepository} from "../../repository/user.repository.js";
import UserModel from "../../models/UserModel.js";

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function (email, password, cb) {
        //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
        const User = new UserModel();
        return User.verifyUser(email, password)
            .then(user => {
                if (!user) {
                    return cb(null, false, {message: 'Incorrect email or password.'});
                }
                return cb(null, user, {message: 'Logged In Successfully'});
            })
            .catch(err => cb(err));
    }
));