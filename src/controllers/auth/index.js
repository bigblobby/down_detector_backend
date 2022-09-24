import authService from '../../services/auth/index.ts';
import cookieService from '../../services/cookie/index.js';
import mailerService from '../../services/mailer/index.js';

const authController = {
    async register(req, res) {
        const user = await authService.register(req.body);
        await authService.createEmailToken(user.email);
        await mailerService.sendEmailVerification(user.email);
        const access_token = await authService.signAccessToken(user, process.env.JWT_ACCESS_EXPIRE);
        const refresh_token = await authService.signRefreshToken(user, process.env.JWT_REFRESH_EXPIRE);
        await authService.addRefreshTokenToRedis(user.id, refresh_token);
        await cookieService.createAndAttachJWTCookie(res, 'access_token', access_token);
        await cookieService.createAndAttachJWTCookie(res, 'refresh_token', refresh_token);
        res.status(201).json({message: 'User successfully created', user: user, access_token, refresh_token});
    },

    async login(req, res) {
        const user = await authService.login(req.body);
        const access_token = await authService.signAccessToken(user, process.env.JWT_ACCESS_EXPIRE);
        const refresh_token = await authService.signRefreshToken(user, process.env.JWT_REFRESH_EXPIRE);
        await authService.addRefreshTokenToRedis(user.id, refresh_token);
        await cookieService.createAndAttachJWTCookie(res, 'access_token', access_token);
        await cookieService.createAndAttachJWTCookie(res, 'refresh_token',  refresh_token);
        res.status(200).json({message: 'Logged In Successfully', user: user, access_token, refresh_token});
    },

    async logout(req, res){
        await authService.logout(req, res);
        res.status(200).json({message: 'You have successfully logged out.'});
    },

    protect(req, res){
        res.status(200).json({
            message: 'Your access token was successfully validated',
            user: req.user
        });
    },

    async resendEmailVerification(req, res){
        await authService.createEmailToken(req.user.email);
        await mailerService.sendEmailVerification(req.user.email);
        res.status(200).json({message: 'Resent verification email'})
    },

    async verifyEmail(req, res){
        await authService.verifyEmail(req.params.token)
        res.status(200).json({message: 'Email successfully verified'})
    },

    async sendForgotPassword(req, res){
        await authService.forgotPassword(req.body.email);
        await mailerService.sendForgotPasswordEmail(req.body.email);
        res.status(200).json({message: 'Email sent successfully'});
    },

    async changePassword(req, res){
        await authService.changePassword(req.body.token, req.body.password);
        res.status(200).json({message: 'Password changed successfully'});
    },

    async updateUserSettings(req, res){
        await authService.updateUserSettings(req.user.id, req.body);
        res.status(200).json({message: 'Settings updated successfully'});
    },

    async refresh(req, res){
        const access_token = await authService.refreshAccessToken(req.body.userId, req.cookies.refresh_token);
        await cookieService.createAndAttachJWTCookie(res, 'access_token', access_token);
        res.status(200).json({access_token});
    }
}


export default authController;