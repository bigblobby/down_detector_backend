function createAndAttachJWTCookie(res, token){
    res.cookie('access_token', token, {
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