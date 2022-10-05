import authService from '../../services/auth/index.ts';
import cookieService from '../../services/cookie/index.js';
import mailerService from '../../services/mailer/index.js';
import jwtService from '../../services/jwt/index.js';
import {User} from '../../models/User.js';
import {InternalServerErrorException} from '../../utils/errors/index.js';

const authController = {
    async register(req, res) {
        const user = await authService.register(req.body);
        await authService.createEmailToken(user.email);
        // TODO implement the mailer service properly
        // await mailerService.sendEmailVerification(user.email);
        const access_token = await jwtService.signAccessToken(user);
        const refresh_token = await jwtService.signRefreshToken(user);
        await jwtService.addRefreshTokenToRedis(user.id, refresh_token);
        await cookieService.attachJwtAccessCookie(res, access_token);
        await cookieService.attachJwtRefreshCookie(res, refresh_token);
        res.status(201).json({message: 'User successfully created', user: user, access_token, refresh_token});
    },

    async login(req, res) {
        const user = await authService.login(req.body);
        const access_token = await jwtService.signAccessToken(user);
        const refresh_token = await jwtService.signRefreshToken(user);
        await jwtService.addRefreshTokenToRedis(user.id, refresh_token);
        await cookieService.attachJwtAccessCookie(res, access_token);
        await cookieService.attachJwtRefreshCookie(res,  refresh_token);
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
        // TODO implement the mailer service properly
        // await mailerService.sendEmailVerification(req.user.email);
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
        const refreshToken = req.cookies.refresh_token;
        const exists = await jwtService.checkRefreshTokenExists(req.body.userId, refreshToken)
        if(exists){
            const decoded = await jwtService.verifyRefreshToken(refreshToken);
            const user = await User.findOne({where: {id: decoded.id}});
            const access_token = await jwtService.signAccessToken(user, process.env.JWT_ACCESS_EXPIRE);
            await cookieService.attachJwtAccessCookie(res, access_token);
            res.status(200).json({access_token});
        } else {
            throw new InternalServerErrorException('Something went wrong');
        }
    },



    // ADMIN

    async logoutUser(req, res){
        const targetUserId = req.body.id;
        await jwtService.invalidateToken(targetUserId);
        res.status(200).json({message: `User ${targetUserId} has been logged out.`});
    }
}


export default authController;