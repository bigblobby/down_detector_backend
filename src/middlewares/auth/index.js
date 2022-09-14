import passport from "passport";

const jwtConfirm = async(req, res, next) => {
    passport.authenticate('jwt', {session: false}, (err, user, info) => {

        // TODO change this once error handler is implemented
        if (!user) {
            const error = new Error("You must first login to view this.");
            error.statusCode = 403;
            return next(error);
        }

        // TODO change this once error handler is implemented
        if(info){
            const error = new Error(info.message);
            error.statusCode = 401;
            return next(error);
        }

        if (err) { return next(err); }

        req.user = user;
        next();
    })(req, res);
};

export default {
    jwtConfirm
}