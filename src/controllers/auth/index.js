import passport from 'passport';
import authService from '../../services/auth/index.ts';
import cookieService from '../../services/cookie/index.js';
import mailerService from '../../services/mailer/index.js';

const authController = {
    async register(req, res) {
        const user = await authService.register(req.body);
        await authService.createEmailToken(user.email);
        await mailerService.sendEmailVerification(user.email);
        const token = await authService.signToken(user);
        await cookieService.createAndAttachJWTCookie(res, token);
        res.status(201).json({message: 'User successfully created', user: user, token: token});
    },

    async login(req, res) {
        const user = await authService.login(req.body);
        const token = await authService.signToken(user);
        await cookieService.createAndAttachJWTCookie(res, token);
        res.status(200).json({message: 'Logged In Successfully', user: user, token: token});
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
    }
}


export default authController;