function createAndAttachJWTCookie(res, token){
    res.cookie('access_token', token, {
        httpOnly: true,
        // Since localhost is not having https protocol, secure cookies does not work correctly (in postman)
        // secure: false,
        signed: true,
        maxAge: eval(process.env.REFRESH_TOKEN_EXPIRY) * 1000,
        sameSite: "Strict",
    });
}

export default {
    createAndAttachJWTCookie
};