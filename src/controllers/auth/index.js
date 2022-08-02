import {UserRepository} from "../../repository/user.repository.js";
import AuthHelper from "../../helpers/auth/index.js";
import passport from "passport";

async function register(req, res) {
    const {username, password, email } = req.body;

    if(!username || !password || !email) {
        return res.status(400).json({message: "Missing username, email or password"});
    }

    try {
        const user = await UserRepository.findOne({
            where: [{username: username}, {email: email}]
        });
        if(user) return res.status(400).json({message: "Username or email already exists"});
    } catch (error) {
        return res.status(400).json({message: error.message});
    }

    try {
        const user = await UserRepository.createUser({username, password, email})
        const token = await AuthHelper.createToken(user);
        res.json({message: "register", user: user, token: token});
    } catch (error) {
        // TODO add proper error handling
        const message = error.code === '23505' ? "Username or email already exists" : error.message;
        return res.status(400).json({message: message});
    }
}

async function login(req, res) {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if(err || !user) {
            return res.status(400).json({message: err.message});
        }

        req.login(user, {session: false}, (err) => {
            if(err) {
                return res.status(400).json({message: err.message});
            }

            const token = AuthHelper.createToken(user);
            // res.cookie('access_token', token, {
            //     httpOnly: true,
            //     // Since localhost is not having https protocol, secure cookies does not work correctly (in postman)
            //     secure: false,
            //     signed: true,
            //     maxAge: eval(process.env.REFRESH_TOKEN_EXPIRY) * 1000,
            //     sameSite: "none",
            // });
            res.json({message: info.message, user: user, token: token});
        });
    })(req, res);
}

function protect(req, res){
    res.json({
        message: "Your access token was successfully validated",
        user: req.user
    });
}

export default {
    register,
    login,
    protect
}