const cookieService = {
    attachJwtAccessCookie(res, token){
        res.cookie('access_token', token, {
            httpOnly: true,
            // secure: false,
            // signed: true,
            maxAge: eval(process.env.JWT_ACCESS_EXPIRE) * 1000,
            sameSite: 'Strict',
        });
    },

    attachJwtRefreshCookie(res, token){
        res.cookie('refresh_token', token, {
            httpOnly: true,
            path: '/api/v1/auth/refresh',
            // secure: false,
            // signed: true,
            maxAge: eval(process.env.JWT_REFRESH_EXPIRE) * 1000,
            sameSite: 'Strict',
        });
    },

}

export default cookieService;