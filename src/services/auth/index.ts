import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import {Op} from 'sequelize';
import {BadRequestException, InternalServerErrorException, NotFoundException, UnauthorizedException} from '../../utils/errors/index.js'
import passwordHelper from '../../helpers/password/index.js';
import permissionMapper from '../../validators/permissionMapper.js';
import redisClient from '../../utils/connectRedis.js';
import {User} from '../../models/User.js';
import {UserSettings} from '../../models/UserSettings.js';
import {EmailVerification} from '../../models/EmailVerification.js';
import {ForgotPassword} from '../../models/ForgotPassword.js';

const authService = {
    async register(data) {
        const existingUser = await User.findOne({
            where: {
                [Op.or]: [
                    {username: data.username},
                    {email: data.email}
                ]
            }
        });

        if (existingUser) throw new BadRequestException('Username or email already exists');

        return await User.create({
            ...data,
            allowedActions: Object.values(permissionMapper),
            settings: {}
        }, {include: [UserSettings]});
    },

    async login(data) {
        const user = await User.findOne({
            where: {
                email: data.email
            },
            raw: true,
            nest: true,
            include: [UserSettings]
        });

        if(!user) throw new NotFoundException("User not found");
        const isValid = await passwordHelper.verifyPassword(data.password, user.password);
        if(!isValid) throw new BadRequestException("Invalid password");

        delete user.password;
        return user;
    },

    async logout(req, res){
        if(req.cookies.access_token){
            res.clearCookie('access_token');
            res.clearCookie('refresh_token');
        } else {
            throw new BadRequestException('Invalid access token');
        }
    },

    async signAccessToken(user, expiry) {
        return jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: Number(expiry)});
    },

    async signRefreshToken(user, expiry) {
        return jwt.sign({id: user.id}, process.env.JWT_REFRESH_SECRET, {expiresIn: Number(expiry)});
    },

    async addRefreshTokenToRedis(id, token){
        const key = `${id}_${token}`;
        const check = await redisClient.EXISTS(key);
        if (check == 1) throw new InternalServerErrorException('Cache error');

        await redisClient.SET(key, "valid");
        /*
            TODO this feels wrong, we shouldn't need to verify the token
             immediately after signing it. Need to figure out a proper way
              of setting the expiry date for redis.
         */
        const payload = await jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        // @ts-ignore
        if ('exp' in payload) {
            await redisClient.EXPIREAT(key, Number(payload.exp));
        }
        return;
    },

    async checkRefreshTokenExists(id, token){
        const key = `${id}_${token}`;
        return redisClient.GET(key);
    },

    async refreshAccessToken(userId, refreshToken){
        const temp = await this.checkRefreshTokenExists(userId, refreshToken);
        if(temp === 'valid'){
            const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
            // @ts-ignore
            const user = await User.findOne({where: {id: decoded.id}});
            return await this.signAccessToken(user, process.env.JWT_ACCESS_EXPIRE);
        } else if(temp === "nil"){
            throw new InternalServerErrorException('Refresh token cache error');
        } else if(temp === "invalid"){
            throw new UnauthorizedException('You need to re-login')
        } else {
            throw new BadRequestException('Invalid refresh token');
        }
    },

    async createEmailToken(email: string): Promise<EmailVerification> {
        const token = uuidv4();
        const expiresAt = new Date().setHours((new Date()).getHours() + 2);

        const [result, inserted] = await EmailVerification.upsert({
            email: email,
            token: token,
            expiresAt: expiresAt
        });

        if(!result) throw new InternalServerErrorException('Something went wrong');

        return result;
    },

    async verifyEmail(token: string) {
        const emailVerification: EmailVerification|null = await EmailVerification.findOne({where: {token: token}});

        if(emailVerification && emailVerification.token){
            const expires = new Date(emailVerification.expiresAt).getTime();
            const now = new Date().getTime();

            if(expires < now) {
                throw new BadRequestException('This token has expired please request a new one')
            }

            const user = await User.update({isVerified: true}, {where: {email: emailVerification.email}});

            if(!user[0]){
                throw new InternalServerErrorException('We couldn\'t verify this account')
            }

        } else {
            throw new NotFoundException('We couldn\'t find a token associated to this user, please request a new code')
        }
    },

    async forgotPassword(email: string){
        return await this.createForgotPasswordToken(email);
    },

    async changePassword(token: string, password: string){
        const forgottenPassword = await ForgotPassword.findOne({where: {token: token}});

        if(forgottenPassword && forgottenPassword.token){
            const expires = new Date(forgottenPassword.expiresAt).getTime();
            const now = new Date().getTime();

            if(expires < now) {
                throw new BadRequestException('This token has expired please request a new one')
            }

            const user = await User.findOne({where: {email: forgottenPassword.email}});

            if(user){
                await ForgotPassword.destroy({where: {token: token}});
                return await User.update({password: password}, {where: {id: user.id}, individualHooks: true});
            } else {
                throw new NotFoundException('User not found');
            }
        } else {
            throw new BadRequestException('You need a valid password token to change your password.');
        }
    },

    async createForgotPasswordToken(email: string){
        const token = uuidv4();
        const expiresAt = new Date().setMinutes((new Date()).getMinutes() + 15);

        const [result, inserted] = await ForgotPassword.upsert({
            email: email,
            token: token,
            expiresAt: expiresAt
        });

        if(!result) throw new InternalServerErrorException('Something went wrong');

        return result;
    },

    async updateUserSettings(userId, data){
        const userSettings = await UserSettings.update(data, {where: {userId}});

        if (!userSettings[0]) {
            throw new InternalServerErrorException('We can\'t update your settings right now.');
        }
    },
}


export default authService;