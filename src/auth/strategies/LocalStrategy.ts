import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

// import {UserRepository} from "../../repository/user.repository.js";
import UserModel from "../../models/UserModel.js";

passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
    function (username, password, cb) {
        //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
        const User = new UserModel();
        return User.verifyUser(username, password)
            .then(user => {
                if (!user[0]) {
                    return cb(null, false, {message: 'Incorrect email or password.'});
                }
                return cb(null, user[0], {message: 'Logged In Successfully'});
            })
            .catch(err => cb(err));
    }
));