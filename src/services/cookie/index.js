function createAndAttachJWTCookie(res, name, token){
    res.cookie(name, token, {
        httpOnly: true,
        // secure: false,
        // signed: true,
        maxAge: eval(process.env.REFRESH_TOKEN_EXPIRY) * 1000,
        sameSite: 'Strict',
    });
}

export default {
    createAndAttachJWTCookie
}