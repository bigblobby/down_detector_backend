import AuthHelper from "../../helpers/auth/index.js";

const jwtConfirm = async(req, res, next) =>{
    if(!req.headers.authorization) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const [ prefix, token ] = req.headers.authorization.split(' ');

    if(token) {
        try {
            req.tokenData = await AuthHelper.verifyToken(token);
            next();
        } catch(e) {
            res.status(401).json({ message: 'Invalid token or token expired', authenticated: false });
        }
    } else {
        res.status(401).json({ message: 'No token provided', authenticated: false });
    }
}

export default {
    jwtConfirm
}