import passport from "passport";
import authService from "../../services/auth/index.js";
import cookieService from "../../services/cookie/index.js";

async function register(req, res) {
    try {
        // Create user
        const user = await authService.register(req.body);

        // Sign token
        const token = await authService.signToken(user);

        // Create and attach cookie
        await cookieService.createAndAttachJWTCookie(res, token);

        res.status(201).json({message: "User successfully created", user: user, token: token});
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

async function login(req, res) {
    try{
        // TODO figure out how to make this less shit
        // Login user
        passport.authenticate('local', {session: false, badRequestMessage: 'Missing email or password',}, (err, user, info) => {
            if(err) {
                return res.status(400).json({message: err?.message || "Something went wrong"});
            }

            req.login(user, {session: false}, async (err) => {
                if(err) {
                    return res.status(400).json({message: err.message});
                }

                const token = await authService.signToken(user);
                await cookieService.createAndAttachJWTCookie(res, token);
                res.json({message: info.message, user: user, token: token});
            });
        })(req, res);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
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